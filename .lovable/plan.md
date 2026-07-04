## เป้าหมาย
เพิ่ม Lightbox ในหน้า `/gallery` — คลิกที่รูปใดก็ได้เพื่อดูแบบขยายเต็มจอ พร้อมเลื่อนก่อน/ถัดไประหว่างรูปทั้งหมด

## สิ่งที่จะทำ

### 1. รวมรูปทั้งหมดเป็นลิสต์เดียว (flat list)
รวม `uploaded` + shots ของทุก `CATEGORIES` เข้าเป็น array เดียว `{ src, title?, caption?, category }[]` สำหรับให้ Lightbox หา index ก่อน/ถัดไปได้

### 2. สร้าง `<Lightbox />` component ใหม่ในไฟล์เดียวกัน
- Overlay เต็มจอ พื้นหลังดำ 95% + backdrop blur
- แสดงรูปกลางจอ (object-contain, จำกัด max-h-[90vh])
- แสดง caption + category ด้านล่าง
- ปุ่ม **← ก่อนหน้า / ถัดไป →** ที่ขอบซ้าย-ขวา + ปุ่ม **✕ ปิด** มุมขวาบน
- ตัวนับ `n / total` มุมซ้ายบน
- คีย์บอร์ด: `←` `→` เลื่อน, `Esc` ปิด (วนลูป)
- คลิกพื้นหลัง = ปิด, คลิกที่รูป = ไม่ปิด
- แตะเลื่อน (swipe) ซ้าย/ขวาบนมือถือ

### 3. ทำให้ทุกรูปคลิกได้
- `UploadedBlock` และ `CategoryBlock` เปลี่ยน `<figure>` เป็น `<button>` (หรือใส่ `onClick` + `cursor-zoom-in`)
- ยกสถานะ `lightboxIndex` ไว้ที่ `GalleryPage` เพื่อให้ทุกบล็อกใช้ index จากลิสต์รวมชุดเดียวกัน

### 4. ล็อก scroll ตอนเปิด lightbox
เพิ่ม `document.body.style.overflow = "hidden"` ใน `useEffect`

## ไฟล์ที่แก้
`src/routes/gallery.tsx` (ไฟล์เดียว) — ไม่มี dependency ใหม่, ไม่มี migration

## ไม่ทำในรอบนี้
- Zoom/pinch-to-zoom ในรูป
- Thumbnails strip ด้านล่าง
- Deep-link URL ต่อรูป (`?photo=id`)

บอกได้ถ้าอยากได้เพิ่ม
