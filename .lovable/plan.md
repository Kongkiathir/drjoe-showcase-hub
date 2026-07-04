## สถานะปัจจุบัน
- ปุ่มลบรูปมีอยู่แล้วในหน้า `/admin` (hover ที่รูป → "ลบภาพนี้")
- ตาราง `gallery_images` มีคอลัมน์ `sort_order` (integer) อยู่แล้ว แต่โค้ดยังเรียงตาม `created_at`

## สิ่งที่จะทำ

### 1. เพิ่มระบบลากวางจัดเรียง (drag & drop sort) ใน `/admin`
- ติดตั้ง `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- เปลี่ยน grid "ภาพในระบบ" ให้ใช้ `DndContext` + `SortableContext`
- แต่ละการ์ดจะมี drag handle (ไอคอน ⋮⋮ มุมซ้ายบน) และมีปุ่มลบเดิมทำงานอยู่
- ลากได้ทั้งเมาส์ (desktop) และแตะค้าง (mobile) — เปิด `PointerSensor` + `TouchSensor`
- โหลด/แสดงเรียงตาม `sort_order ASC, created_at DESC`

### 2. บันทึกลำดับลง DB
- หลังจบการลาก อัปเดต state ทันที (optimistic) แล้วยิง `UPDATE gallery_images SET sort_order=? WHERE id=?` เป็นชุด
- ใช้เลขห่าง 10 (10, 20, 30…) เพื่อให้แทรกกลางได้ง่าย
- ถ้าล้มเหลว → alert + reload จาก DB

### 3. ปรับปรุงเล็กน้อย
- แทน `confirm()` ปุ่มลบยังใช้เหมือนเดิม (ผู้ใช้ไม่ได้ขอเปลี่ยน)
- ปรับ Gallery หน้า `/gallery` ให้เรียงตาม `sort_order` ด้วย เพื่อให้ลำดับที่จัดใน admin สะท้อนบนหน้าเว็บ

### รายละเอียดเทคนิค
- ไฟล์ที่แก้: `src/routes/_authenticated/admin.tsx`, `src/routes/gallery.tsx` (แค่แก้ `.order(...)`)
- ไม่มีการเปลี่ยน schema (คอลัมน์มีอยู่แล้ว)
- ไม่มีการสร้าง migration ใหม่

## ไม่ทำในรอบนี้
- ระบบ bulk-select / bulk-delete
- การแก้ caption/category inline (ยังต้องลบแล้วอัปโหลดใหม่)

แจ้งได้ถ้าอยากได้เพิ่ม
