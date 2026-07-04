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
    const { data: role } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    setSession({
      status: "signed-in",
      email: data.user.email ?? "",
      userId: data.user.id,
      isAdmin: !!role,
    });
  }

  useEffect(() => {
    refreshSession();
  }, []);

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
  const [showChange, setShowChange] = useState(false);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (next.length < 8) {
      setMsg({ kind: "err", text: "รหัสผ่านใหม่ต้องยาวอย่างน้อย 8 ตัวอักษร" });
      return;
    }
    if (next !== confirm) {
      setMsg({ kind: "err", text: "รหัสผ่านใหม่และการยืนยันไม่ตรงกัน" });
      return;
    }
    if (next === current) {
      setMsg({ kind: "err", text: "รหัสผ่านใหม่ต้องต่างจากรหัสผ่านเดิม" });
      return;
    }

    setBusy(true);
    try {
      // Re-verify current password before allowing change
      const { error: verifyErr } = await supabase.auth.signInWithPassword({
        email,
        password: current,
      });
      if (verifyErr) {
        throw new Error("รหัสผ่านปัจจุบันไม่ถูกต้อง");
      }

      const { error: updErr } = await supabase.auth.updateUser({ password: next });
      if (updErr) throw updErr;

      setMsg({ kind: "ok", text: "เปลี่ยนรหัสผ่านสำเร็จ ✓ ครั้งต่อไปให้ใช้รหัสผ่านใหม่" });
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setMsg({
        kind: "err",
        text: err instanceof Error ? err.message : "เปลี่ยนรหัสผ่านไม่สำเร็จ",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div>
          <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← กลับหน้าแรก
          </Link>
          <div className="mt-4 flex items-center gap-2">
            {isAdmin && (
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                ● Root Admin
              </span>
            )}
          </div>
          <h1 className="mt-2 text-2xl font-semibold">บัญชีของคุณ</h1>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{email}</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <button
            type="button"
            onClick={() => setShowChange((v) => !v)}
            className="flex w-full items-center justify-between text-sm font-semibold"
          >
            <span>เปลี่ยนรหัสผ่าน <span className="ml-1 text-xs font-normal text-muted-foreground">(ไม่บังคับ)</span></span>
            <span className="text-xs text-muted-foreground">{showChange ? "▾" : "▸"}</span>
          </button>

          {showChange && (
            <div className="mt-4 space-y-3">
              <form onSubmit={submit} className="space-y-3">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="รหัสผ่านปัจจุบัน"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="รหัสผ่านใหม่ (อย่างน้อย 8 ตัว)"
                  value={next}
                  onChange={(e) => setNext(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                >
                  {busy ? "กำลังบันทึก..." : "บันทึกรหัสผ่านใหม่"}
                </button>
              </form>
              {msg && (
                <p
                  className={`text-xs ${
                    msg.kind === "ok" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {msg.text}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {isAdmin && (
            <button
              onClick={onGoAdmin}
              className="flex-1 rounded-md border border-border px-4 py-2 text-xs hover:bg-accent/10"
            >
              ไปหน้า Admin
            </button>
          )}
          <button
            onClick={onSignOut}
            className="flex-1 rounded-md border border-border px-4 py-2 text-xs hover:bg-accent/10"
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
