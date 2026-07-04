
## สิ่งที่จะทำ

### 1) อัปโหลด 10 ภาพที่คุณเพิ่งส่งมาเข้า Gallery ทันที
สร้าง asset pointer ให้ทั้ง 10 ไฟล์ผ่าน Lovable Assets แล้วเพิ่มเป็นการ์ดใน `src/routes/gallery.tsx` ส่วน "Latest Uploads" (แสดงเลยโดยไม่ต้องรอ login) พร้อม caption/category ที่เดาจากภาพ:

| # | ภาพ | Category | Caption |
|---|-----|----------|---------|
| 1 | 08A96332 (กรีนสกรีน+ไมค์) | On Set | เบื้องหลังถ่ายทำ กรีนสกรีน |
| 2 | 8A187513 (สัมภาษณ์โซฟา) | Interview | บันทึกเทปสัมภาษณ์ |
| 3 | 8DF4A912 (MuayOG studio) | Podcast | รายการ MuayOG |
| 4 | 16_Topaz (เสื้อเหลืองไมค์) | Event | งานแถลงข่าว |
| 5 | 27E0332D (เสื้อลายมังกร) | Portrait | โปรโมตคาแรกเตอร์ |
| 6 | 30D5E420 (ครุยแดง) | Milestone | รับปริญญา |
| 7 | 77CB952B (ควัน+ชฎา) | Performance | การแสดงบนเวที |
| 8 | 103CBCE4 (ถ่ายรูปหมู่ทีวี) | On Set | ทีมงานรายการโทรทัศน์ |
| 9 | 279FFDC2 (หัวเราะกล้อง) | On Set | บรรยากาศกองถ่าย |
| 10 | 537CE58F (Three Man Down) | Event | คอนเสิร์ต Three Man Down |

### 2) ตรวจว่าระบบ drag & drop ที่สร้างไว้แล้วยังใช้งานได้
- ยืนยันว่า `/auth`, `/_authenticated/admin`, table `gallery_images`, bucket `gallery`, RLS + role admin ทั้งหมดยัง compile และ typecheck ผ่าน
- ไม่แก้ backend เพิ่ม (โครงพร้อมแล้ว: 10 ไฟล์/ครั้ง, 20MB/ไฟล์, JPG/PNG/WebP)

### 3) สิ่งที่คุณต้องทำเอง (ยังจำเป็น หากอยากอัปเองในอนาคต)
1. เข้า `/auth` สมัครด้วยอีเมล 1 ครั้ง
2. แจ้งอีเมลกลับมาเพื่อรัน SQL ให้สิทธิ์ admin
3. หลังได้สิทธิ์ → ใช้ `/admin` ลาก-วางอัปเองได้เลย

## รายละเอียดทางเทคนิค

- ใช้ `lovable-assets create --file /mnt/user-uploads/<file>` ต่อแต่ละภาพ → เขียนเป็น `src/assets/gallery-*.jpg.asset.json`
- ใน `gallery.tsx` เพิ่ม array `seededImages` (import 10 pointer) merge เข้าก่อนรายการจาก DB ให้เห็นทันที
- ไม่แตะ `routeTree.gen.ts` / auto-gen files
- ไม่ติดตั้ง package เพิ่ม

## นอกขอบเขต
- ไม่แก้ธีม/หน้า index
- ไม่แก้ policies/schema เพิ่ม
