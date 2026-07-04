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
  const [userEmail, setUserEmail] = useState<string | null>(null);
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
      setUserEmail(userData.user.email ?? null);
      const { data: isAdminRpc } = await supabase.rpc("has_role", {
        _user_id: userData.user.id,
        _role: "admin",
      });
      const admin = !!isAdminRpc;
      setIsAdmin(admin);


      if (!admin) {
        setImages([]);
        return;
      }

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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((i) => i.id === active.id);
    const newIndex = images.findIndex((i) => i.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(images, oldIndex, newIndex).map((img, idx) => ({
      ...img,
      sort_order: (idx + 1) * 10,
    }));
    setImages(reordered); // optimistic
    const updates = await Promise.all(
      reordered.map((img) =>
        supabase
          .from("gallery_images")
          .update({ sort_order: img.sort_order })
          .eq("id", img.id),
      ),
    );
    const failed = updates.find((r) => r.error);
    if (failed?.error) {
      alert(`บันทึกลำดับล้มเหลว: ${failed.error.message}`);
      setRefreshKey((k) => k + 1);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-sm text-muted-foreground">
        กำลังตรวจสอบสิทธิ์…
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
        <div className="w-full max-w-lg rounded-lg border border-destructive/40 bg-destructive/5 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">
              🔒 ไม่มีสิทธิ์เข้าถึง (Access Denied)
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-lg font-semibold">หน้านี้สำหรับ Root Admin เท่านั้น</h1>
            <p className="text-sm text-muted-foreground">
              คุณกำลังเข้าสู่ระบบด้วยบัญชี{" "}
              <span className="font-mono text-foreground">{userEmail}</span>{" "}
              ซึ่งยังไม่ได้รับสิทธิ์ admin ในระบบ
            </p>
          </div>

          <div className="rounded-md border border-border bg-card p-4 space-y-3">
            <p className="text-sm font-semibold">ต้องทำอะไรต่อ?</p>
            <ol className="list-decimal space-y-2 pl-5 text-xs text-muted-foreground">
              <li>
                ตรวจสอบว่าอีเมลนี้ตรงกับค่า{" "}
                <span className="font-mono text-foreground">ROOT_ADMIN_EMAIL</span>{" "}
                ที่ตั้งไว้ใน environment variable หรือไม่
                <br />
                — ถ้าไม่ตรง ให้ <button onClick={signOut} className="underline hover:text-foreground">ออกจากระบบ</button>{" "}
                แล้วเข้าใหม่ด้วยอีเมลที่ถูกต้อง
              </li>
              <li>
                ถ้าอีเมลถูกต้องแล้วแต่ยังไม่ได้สิทธิ์ ให้ไปที่หน้า{" "}
                <Link to="/auth" className="font-mono underline hover:text-foreground">/auth</Link>{" "}
                → เปิดส่วน <span className="font-medium text-foreground">🔑 ยืนยันสิทธิ์ Root Admin</span>{" "}
                แล้ววาง <span className="font-mono text-foreground">ROOT_ADMIN_BOOTSTRAP_TOKEN</span>{" "}
                เพื่อ sync สิทธิ์
              </li>
              <li>
                หลังจาก sync สำเร็จ กลับมาที่หน้านี้อีกครั้งและกด refresh
              </li>
            </ol>
          </div>

          <div className="flex flex-wrap justify-end gap-3 pt-1">
            <Link
              to="/"
              className="rounded-md border border-border px-4 py-2 text-xs hover:bg-accent/10"
            >
              กลับหน้าแรก
            </Link>
            <Link
              to="/auth"
              className="rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-primary hover:bg-primary/20"
            >
              ไปยืนยันสิทธิ์ที่ /auth
            </Link>
            <button
              onClick={signOut}
              className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    );
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
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                ● Root Admin
              </span>
              <span className="mt-1 font-mono text-[11px] text-muted-foreground">{userEmail}</span>
            </div>
            <button
              onClick={signOut}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">


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
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">
              ภาพในระบบ ({images.length})
            </h2>
            {images.length > 0 && (
              <p className="text-xs text-muted-foreground">
                ลากที่มุมซ้ายบนของภาพเพื่อจัดลำดับใหม่
              </p>
            )}
          </div>
          {images.length === 0 ? (
            <p className="text-sm text-muted-foreground">ยังไม่มีภาพในระบบ</p>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={images.map((i) => i.id)}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {images.map((img) => (
                    <SortableTile key={img.id} img={img} onDelete={deleteImage} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </section>
      </main>
    </div>
  );
}

function SortableTile({
  img,
  onDelete,
}: {
  img: GalleryRow;
  onDelete: (row: GalleryRow) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: img.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded overflow-hidden border border-border bg-background"
    >
      <img
        src={img.url}
        alt={img.caption ?? ""}
        className="aspect-square w-full object-cover"
        loading="lazy"
        draggable={false}
      />
      <button
        {...attributes}
        {...listeners}
        aria-label="ลากเพื่อจัดลำดับ"
        className="absolute left-1 top-1 z-10 rounded bg-black/60 px-1.5 py-1 text-xs text-white/90 cursor-grab active:cursor-grabbing hover:bg-black/80 touch-none"
      >
        ⋮⋮
      </button>
      <div className="pointer-events-none absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2">
        <p className="text-[10px] text-white/90 line-clamp-2">
          {img.caption || "—"}
        </p>
        <p className="text-[10px] text-white/60">{img.category}</p>
        <button
          onClick={() => onDelete(img)}
          className="pointer-events-auto mt-2 text-[10px] text-red-300 hover:text-red-100"
        >
          ลบภาพนี้
        </button>
      </div>
    </div>
  );
}
