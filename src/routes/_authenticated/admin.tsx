import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/integrations/supabase/client";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Gallery Upload | Dr. Joe" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

const MAX_FILES = 10;
const MAX_SIZE = 20 * 1024 * 1024; // 20MB
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10; // 10 years

const CATEGORIES = [
  { value: "podcast", label: "Podcast (MUAY O.G.)" },
  { value: "talkshow", label: "Talkshow / TV" },
  { value: "thaifight", label: "THAI FIGHT" },
  { value: "bts", label: "Behind the Scenes" },
  { value: "stage", label: "Stage / Keynote" },
  { value: "other", label: "อื่นๆ" },
];

type PendingFile = {
  id: string;
  file: File;
  preview: string;
  caption: string;
  category: string;
  progress: number;
  status: "pending" | "uploading" | "done" | "error";
  error?: string;
};

type GalleryRow = {
  id: string;
  url: string;
  storage_path: string;
  caption: string | null;
  category: string;
  created_at: string;
  sort_order: number;
};

function AdminPage() {
  const navigate = useNavigate();
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [images, setImages] = useState<GalleryRow[]>([]);
  const [uploading, setUploading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        navigate({ to: "/auth" });
        return;
      }
      // Check admin via a probe: try inserting empty is heavy — instead just try to list roles via RPC bypass. Use a query on gallery_images with insert probe? Easiest: attempt storage list.
      // We'll trust the RLS and let uploads reveal 403 if not admin. Show a warning meanwhile.
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!roleData);

      const { data: imgs } = await supabase
        .from("gallery_images")
        .select("id,url,storage_path,caption,category,created_at,sort_order")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      setImages(imgs ?? []);
    })();
  }, [navigate, refreshKey]);

  const onDrop = useCallback((accepted: File[], rejections: any[]) => {
    setPending((prev) => {
      const room = MAX_FILES - prev.length;
      const toAdd = accepted.slice(0, room).map((f) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${Math.random()}`,
        file: f,
        preview: URL.createObjectURL(f),
        caption: "",
        category: "other",
        progress: 0,
        status: "pending" as const,
      }));
      return [...prev, ...toAdd];
    });
    if (rejections.length) {
      alert(
        rejections
          .map((r) => `${r.file.name}: ${r.errors.map((e: any) => e.message).join(", ")}`)
          .join("\n"),
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
    disabled: uploading || pending.length >= MAX_FILES,
  });

  function updateFile(id: string, patch: Partial<PendingFile>) {
    setPending((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }
  function removeFile(id: string) {
    setPending((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  async function uploadAll() {
    if (!pending.length) return;
    setUploading(true);
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    for (const item of pending) {
      if (item.status === "done") continue;
      updateFile(item.id, { status: "uploading", progress: 10, error: undefined });
      try {
        const ext = item.file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("gallery")
          .upload(path, item.file, {
            contentType: item.file.type,
            upsert: false,
          });
        if (upErr) throw upErr;
        updateFile(item.id, { progress: 60 });

        const { data: signed, error: sigErr } = await supabase.storage
          .from("gallery")
          .createSignedUrl(path, SIGNED_URL_TTL);
        if (sigErr || !signed) throw sigErr || new Error("ไม่สามารถสร้าง URL");

        const { error: insErr } = await supabase.from("gallery_images").insert({
          url: signed.signedUrl,
          storage_path: path,
          caption: item.caption || null,
          category: item.category,
          uploaded_by: userId,
        });
        if (insErr) throw insErr;
        updateFile(item.id, { progress: 100, status: "done" });
      } catch (err) {
        updateFile(item.id, {
          status: "error",
          error: err instanceof Error ? err.message : "อัปโหลดล้มเหลว",
        });
      }
    }
    setUploading(false);
    setRefreshKey((k) => k + 1);
    // Clear successful ones
    setPending((prev) => prev.filter((p) => p.status !== "done"));
  }

  async function deleteImage(row: GalleryRow) {
    if (!confirm(`ลบภาพนี้? "${row.caption || row.storage_path}"`)) return;
    await supabase.storage.from("gallery").remove([row.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", row.id);
    setRefreshKey((k) => k + 1);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← กลับหน้าแรก
            </Link>
            <h1 className="mt-1 text-xl font-semibold">Admin · Gallery Upload</h1>
          </div>
          <button
            onClick={signOut}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ออกจากระบบ
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {isAdmin === false && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm">
            บัญชีนี้ยังไม่ได้รับสิทธิ์แอดมิน — ติดต่อ Lovable เพื่อรันคำสั่งเพิ่มสิทธิ์
            ให้กับอีเมลของคุณ (โพสต์อีเมลกลับมาในแชท)
          </div>
        )}

        <section>
          <div
            {...getRootProps()}
            className={`rounded-lg border-2 border-dashed p-10 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            } ${pending.length >= MAX_FILES ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <input {...getInputProps()} />
            <p className="text-sm font-medium">
              {isDragActive
                ? "วางไฟล์ที่นี่..."
                : "ลากรูปมาวาง หรือคลิกเพื่อเลือกไฟล์"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              JPG / PNG / WebP · สูงสุด {MAX_FILES} ไฟล์/ครั้ง · ไฟล์ละไม่เกิน 20MB
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              เลือกแล้ว {pending.length}/{MAX_FILES}
            </p>
          </div>
        </section>

        {pending.length > 0 && (
          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold">รอการอัปโหลด</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    pending.forEach((p) => URL.revokeObjectURL(p.preview));
                    setPending([]);
                  }}
                  disabled={uploading}
                  className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  ล้างทั้งหมด
                </button>
                <button
                  onClick={uploadAll}
                  disabled={uploading || pending.every((p) => p.status === "done")}
                  className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
                >
                  {uploading ? "กำลังอัปโหลด..." : `อัปโหลดทั้งหมด (${pending.length})`}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pending.map((p) => (
                <div key={p.id} className="rounded-md border border-border p-3 space-y-2">
                  <div className="relative aspect-video overflow-hidden rounded bg-muted">
                    <img
                      src={p.preview}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    {p.status === "uploading" && (
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-black/40">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                    )}
                    {p.status === "done" && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center text-green-100 text-xs font-medium">
                        ✓ อัปโหลดสำเร็จ
                      </div>
                    )}
                    {p.status === "error" && (
                      <div className="absolute inset-0 bg-red-500/40 flex items-center justify-center text-white text-xs p-2 text-center">
                        {p.error}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {p.file.name} · {(p.file.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                  <input
                    type="text"
                    placeholder="คำบรรยาย (ไม่บังคับ)"
                    value={p.caption}
                    onChange={(e) => updateFile(p.id, { caption: e.target.value })}
                    disabled={uploading}
                    className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
                  />
                  <select
                    value={p.category}
                    onChange={(e) => updateFile(p.id, { category: e.target.value })}
                    disabled={uploading}
                    className="w-full rounded border border-input bg-background px-2 py-1 text-xs"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeFile(p.id)}
                    disabled={uploading}
                    className="w-full text-xs text-muted-foreground hover:text-destructive disabled:opacity-50"
                  >
                    ลบ
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 text-sm font-semibold">
            ภาพในระบบ ({images.length})
          </h2>
          {images.length === 0 ? (
            <p className="text-sm text-muted-foreground">ยังไม่มีภาพในระบบ</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.id} className="group relative rounded overflow-hidden border border-border">
                  <img
                    src={img.url}
                    alt={img.caption ?? ""}
                    className="aspect-square w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
                    <p className="text-[10px] text-white/90 line-clamp-2">
                      {img.caption || "—"}
                    </p>
                    <p className="text-[10px] text-white/60">{img.category}</p>
                    <button
                      onClick={() => deleteImage(img)}
                      className="mt-2 text-[10px] text-red-300 hover:text-red-100"
                    >
                      ลบภาพนี้
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
