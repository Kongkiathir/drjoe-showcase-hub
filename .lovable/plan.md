## เป้าหมาย
เพิ่มระบบอัปโหลดหลายภาพแบบ drag & drop สำหรับแอดมิน (คุณเท่านั้น) เพื่อเพิ่มรูปเข้าหน้า Gallery ได้เอง โดยไม่ต้องส่งผ่าน AI

## สรุปฟีเจอร์
- หน้า `/admin` ที่ต้องล็อกอินด้วยอีเมล (Lovable Cloud Auth)
- Dropzone อัปโหลดครั้งละไม่เกิน **10 ไฟล์**, ไฟล์ละไม่เกิน **20MB**, เฉพาะรูปภาพ (jpg/png/webp)
- แสดง preview + progress ต่อไฟล์ + ปุ่มลบก่อนอัป
- ช่องกรอก caption/หมวด (Podcast, Talkshow, THAI FIGHT, Behind the scenes, อื่นๆ) ต่อรูป
- อัปโหลดขึ้น Lovable Cloud Storage (bucket public) → บันทึก URL + metadata ลงตาราง
- หน้า `/gallery` อ่านจากตาราง แล้ว render อัตโนมัติ (ยังคง gallery ปัจจุบันเป็น fallback ถ้าตารางว่าง)
- แอดมินลบภาพเดิมจาก `/admin` ได้

## แผนเทคนิค

**1. Backend (Lovable Cloud)**
- เปิด Lovable Cloud
- Auth: email + password (ไม่ใช้ social) — คุณสมัคร 1 บัญชี
- Storage bucket: `gallery` (public read)
- ตาราง `gallery_images`: `id, url, storage_path, caption, category, sort_order, uploaded_by, created_at`
- ตาราง `user_roles` + enum `app_role('admin')` + ฟังก์ชัน `has_role()` (ตาม security pattern)
- RLS:
  - `SELECT` เปิดให้ทุกคน (anon + authenticated)
  - `INSERT/UPDATE/DELETE` เฉพาะ `has_role(auth.uid(),'admin')`
- Storage policies: อ่านสาธารณะ, เขียน/ลบเฉพาะ admin
- Seed: assign role admin ให้ user id ของคุณ (หลังคุณสมัครแล้ว)

**2. Frontend**
- `src/routes/auth.tsx` — หน้า login/signup (email + password)
- `src/routes/_authenticated/route.tsx` — managed gate (มีอยู่แล้วเมื่อเปิด Cloud)
- `src/routes/_authenticated/admin.tsx` — หน้าแอดมิน
  - Dropzone (react-dropzone) รับ image/*, maxFiles=10, maxSize=20MB
  - Validation ฝั่ง client + toast แจ้ง error รายไฟล์
  - Grid preview พร้อม input caption, select category, ปุ่มลบ
  - ปุ่ม "อัปโหลดทั้งหมด" → upload ทีละไฟล์ไป Storage + insert row + แสดง progress bar
  - ตารางรูปที่มี พร้อมปุ่มลบ (ลบทั้ง storage + row)
- `src/routes/gallery.tsx` — ดึงจาก `gallery_images` ด้วย server fn public (publishable key) + fallback รูปเดิม
- ลิงก์ "Admin" เล็กๆ ใน footer (แสดงเฉพาะเมื่อ login แล้ว)

**3. Dependencies**
- `bun add react-dropzone`

## ขั้นตอนหลังทำเสร็จ (สิ่งที่คุณต้องทำ)
1. คลิก Sign up ที่ `/auth` ด้วยอีเมลของคุณ 1 ครั้ง
2. บอกอีเมลกลับมาให้ผม เพื่อรัน migration ให้สิทธิ์ admin
3. หลังจากนั้นเข้า `/admin` ลาก-วางรูปได้เลย

## ข้อจำกัด
- 10 ไฟล์/ครั้ง, 20MB/ไฟล์ (บังคับทั้ง client + Storage policy)
- รองรับ JPG, PNG, WebP เท่านั้น (ไม่รับ HEIC — ต้องแปลงก่อน)
