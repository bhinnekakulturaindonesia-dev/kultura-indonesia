# 🚀 Setup Dashboard Admin - Quick Start

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Setup Supabase

### A. Jalankan SQL Baru
1. Buka **Supabase Dashboard** → https://supabase.com/dashboard
2. Pilih project Kultura Indonesia
3. Klik **SQL Editor** → **New Query**
4. Copy-paste isi file `supabase/schema.sql`
5. Klik **Run**

SQL ini akan:
- Membuat policies untuk admin (authenticated users)
- Membuat storage bucket untuk upload gambar
- Setup permissions

### B. Buat User Admin
1. Di Supabase Dashboard → **Authentication** → **Users**
2. Klik **"Add user"** (hijau, kanan atas)
3. Isi:
   - **Email**: `admin@kulturaindonesia.or.id` (atau email kamu)
   - **Password**: buat password yang kuat (min 6 karakter)
   - ✅ **PENTING**: Centang **"Auto Confirm User"**
4. Klik **"Create user"**

## 3️⃣ Test Login

```bash
npm run dev
```

Buka browser:
1. http://localhost:3000/admin
2. Login dengan email & password yang baru dibuat
3. Selesai! 🎉

## 📝 Cara Pakai

### Buat Artikel Baru
1. Dashboard → Artikel → ➕ Buat Artikel Baru
2. Tulis judul, konten (pakai rich text editor)
3. Upload gambar cover
4. Pilih status: Draft atau Published
5. Klik "Publikasikan"

### Upload Gambar
**Opsi 1**: Media Library
- Dashboard → Media → Upload gambar → Copy URL

**Opsi 2**: Langsung di Form Artikel
- Sidebar → Upload Gambar → Auto-upload

### Tambah Portofolio/Kegiatan
- Dashboard → Portofolio/Kegiatan
- Klik tombol ➕ 
- Isi form → Simpan

## 🔑 Login Dashboard

**Local**: http://localhost:3000/admin
**Production**: https://kulturaindonesia.vercel.app/admin

## ❗ Troubleshooting

### Tidak bisa login?
- Pastikan user sudah dibuat di Supabase Auth
- Pastikan "Auto Confirm User" dicentang
- Cek email/password benar

### Tidak bisa upload gambar?
- Pastikan SQL schema sudah dijalankan
- Cek storage bucket 'images' ada di Supabase → Storage

### Error saat create artikel?
- Pastikan policies sudah dibuat (jalankan SQL schema)
- Pastikan sudah login

## 📚 Dokumentasi Lengkap

Lihat file `DASHBOARD_README.md` untuk dokumentasi lengkap.

---

**Selamat! Dashboard admin siap digunakan** ✨
