import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Login | Dr. Joe" },
      { name: "description", content: "Admin sign-in for Dr. Joe's site." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

type SessionState =
  | { status: "loading" }
  | { status: "anon" }
  | { status: "signed-in"; email: string; userId: string; isAdmin: boolean };

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [session, setSession] = useState<SessionState>({ status: "loading" });

  async function refreshSession() {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setSession({ status: "anon" });
      return;
    }
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: data.user.id,
      _role: "admin",
    });
    setSession({
      status: "signed-in",
      email: data.user.email ?? "",
      userId: data.user.id,
      isAdmin: !!isAdmin,
    });

  }

  useEffect(() => {
    refreshSession();
  }, []);

  // Auto-redirect to /admin when signed in and admin
  useEffect(() => {
    if (session.status === "signed-in" && session.isAdmin) {
      navigate({ to: "/admin" });
    }
  }, [session, navigate]);


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("สมัครสำเร็จ! ตรวจอีเมลเพื่อยืนยัน (หรือเข้าสู่ระบบได้เลยถ้าปิดการยืนยัน)");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        await refreshSession();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }

  if (session.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-sm text-muted-foreground">
        กำลังโหลด…
      </div>
    );
  }

  if (session.status === "signed-in") {
    return (
      <SignedInPanel
        email={session.email}
        isAdmin={session.isAdmin}
        onSignOut={async () => {
          await supabase.auth.signOut();
          setSession({ status: "anon" });
        }}
        onGoAdmin={() => navigate({ to: "/admin" })}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
          ← กลับหน้าแรก
        </Link>
        <h1 className="mt-4 text-2xl font-semibold">
          {mode === "signin" ? "เข้าสู่ระบบแอดมิน" : "สมัครบัญชีแอดมิน"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          เฉพาะเจ้าของเว็บไซต์เท่านั้น
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {loading ? "กำลังดำเนินการ..." : mode === "signin" ? "เข้าสู่ระบบ" : "สมัครบัญชี"}
          </button>
        </form>

        {msg && (
          <p className="mt-3 text-sm text-muted-foreground whitespace-pre-wrap">{msg}</p>
        )}

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "ยังไม่มีบัญชี? สมัครที่นี่"
            : "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ"}
        </button>

        <BootstrapPanel
          onDone={(bootstrapEmail) => {
            setEmail(bootstrapEmail);
            setMode("signin");
          }}
        />
      </div>
    </div>
  );
}

function SignedInPanel({
  email,
  isAdmin,
  onSignOut,
  onGoAdmin,
}: {
  email: string;
  isAdmin: boolean;
  onSignOut: () => void | Promise<void>;
  onGoAdmin: () => void;
}) {
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-lg rounded-lg border border-destructive/40 bg-destructive/5 p-6 space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
            🔒 ไม่มีสิทธิ์เข้าถึง (Access Denied)
          </span>
          <div className="space-y-2">
            <h1 className="text-lg font-semibold">บัญชีนี้ยังไม่ได้รับสิทธิ์ Admin</h1>
            <p className="text-sm text-muted-foreground">
              คุณเข้าสู่ระบบด้วย{" "}
              <span className="font-mono text-foreground">{email}</span>{" "}
              แต่บัญชีนี้ไม่มีสิทธิ์เข้าหน้า admin
            </p>
          </div>
          <div className="rounded-md border border-border bg-card p-4 space-y-2 text-xs text-muted-foreground">
            <p className="text-sm font-semibold text-foreground">ต้องทำอะไรต่อ?</p>
            <ol className="list-decimal space-y-1 pl-5">
              <li>
                ตรวจสอบว่าอีเมลตรงกับ{" "}
                <span className="font-mono text-foreground">ROOT_ADMIN_EMAIL</span>{" "}
                หรือไม่ — ถ้าไม่ตรง ให้ออกจากระบบและเข้าใหม่
              </li>
              <li>
                ถ้าอีเมลถูกแล้ว ให้ใช้ส่วน{" "}
                <span className="font-medium text-foreground">🔑 ยืนยันสิทธิ์ Root Admin</span>{" "}
                ด้านล่างด้วย{" "}
                <span className="font-mono text-foreground">ROOT_ADMIN_BOOTSTRAP_TOKEN</span>
              </li>
            </ol>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <Link
              to="/"
              className="rounded-md border border-border px-4 py-2 text-xs hover:bg-accent/10"
            >
              กลับหน้าแรก
            </Link>
            <button
              onClick={onSignOut}
              className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admins are auto-redirected to /admin by the effect in AuthPage.
  // This fallback shows briefly during the redirect.
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm space-y-6 text-center">
        <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
          ● Root Admin
        </span>
        <h1 className="text-2xl font-semibold">กำลังพาไปหน้า Admin…</h1>
        <p className="font-mono text-xs text-muted-foreground">{email}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onGoAdmin}
            className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            ไปหน้า Admin
          </button>
          <button
            onClick={onSignOut}
            className="rounded-md border border-border px-4 py-2 text-xs hover:bg-accent/10"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
}



function BootstrapPanel({ onDone }: { onDone: (email: string) => void }) {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<
    { kind: "ok"; email: string } | { kind: "err"; text: string } | null
  >(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/public/bootstrap-admin", {
        method: "POST",
        headers: { "x-bootstrap-token": token.trim() },
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        email?: string;
        error?: string;
      };
      if (!res.ok || !body.ok || !body.email) {
        const text =
          res.status === 403
            ? "Token ไม่ถูกต้อง"
            : body.error ?? `ล้มเหลว (HTTP ${res.status})`;
        setResult({ kind: "err", text });
        return;
      }
      setResult({ kind: "ok", email: body.email });
      setToken("");
      onDone(body.email);
    } catch (err) {
      setResult({
        kind: "err",
        text: err instanceof Error ? err.message : "เกิดข้อผิดพลาด",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-8 border-t border-border pt-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs text-muted-foreground hover:text-foreground"
      >
        {open ? "▾" : "▸"} 🔑 ยืนยันสิทธิ์ Root Admin ด้วย Bootstrap Token
      </button>

      {open && (
        <div className="mt-3 space-y-3 rounded-md border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">
            วาง <span className="font-mono">ROOT_ADMIN_BOOTSTRAP_TOKEN</span>{" "}
            เพื่อยืนยันสิทธิ์ admin ให้กับบัญชีที่กำหนดใน environment
            (ถ้ายังไม่มีบัญชีจะสร้างให้ใหม่ — ถ้ามีอยู่แล้วรหัสผ่านเดิมจะไม่ถูกเปลี่ยน)
          </p>
          <form onSubmit={submit} className="space-y-2">
            <input
              type="password"
              autoComplete="off"
              placeholder="Bootstrap token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
            />
            <button
              type="submit"
              disabled={busy || !token.trim()}
              className="w-full rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary hover:bg-primary/20 disabled:opacity-50"
            >
              {busy ? "กำลังตรวจสอบ..." : "ยืนยันและซิงค์บัญชี"}
            </button>
          </form>
          {result?.kind === "ok" && (
            <p className="text-xs text-primary">
              ✓ ยืนยันสำเร็จ — บัญชี{" "}
              <span className="font-mono">{result.email}</span>{" "}
              พร้อมสิทธิ์ admin แล้ว เข้าสู่ระบบด้วยรหัสผ่านเดิมได้เลย
            </p>
          )}
          {result?.kind === "err" && (
            <p className="text-xs text-destructive">✗ {result.text}</p>
          )}
        </div>
      )}
    </div>
  );
}
