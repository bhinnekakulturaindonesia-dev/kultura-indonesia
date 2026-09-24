# ✅ Checklist Setup Dashboard Admin

Ikuti checklist ini step-by-step untuk setup dashboard admin.

## 📋 Pre-Setup

- [ ] Repository sudah di-pull/clone
- [ ] Node.js sudah terinstall (v18+)
- [ ] Supabase project sudah ada
- [ ] File `.env.local` sudah ada dengan credentials Supabase

---

## 🔧 Setup Process

### Step 1: Install Dependencies (5 menit)

- [ ] Buka terminal di folder project
- [ ] Jalankan: `npm install`
- [ ] Tunggu sampai selesai (bisa lama karena download packages)
- [ ] Tidak ada error? ✅ Lanjut ke Step 2

**Troubleshooting:**
- Error "npm not found" → Install Node.js dulu
- Error lain → Coba `npm install --force`

---

### Step 2: Setup Supabase Database (10 menit)

#### A. Jalankan SQL Schema

- [ ] Buka [Supabase Dashboard](https://supabase.com/dashboard)
- [ ] Pilih project Kultura Indonesia
- [ ] Klik menu **"SQL Editor"** (di sidebar kiri)
- [ ] Klik **"New Query"** (tombol hijau)
- [ ] Buka file `supabase/schema.sql` di project
- [ ] Copy **SEMUA** isi file tersebut
- [ ] Paste di SQL Editor
- [ ] Klik **"Run"** (Ctrl+Enter)
- [ ] Tunggu sampai selesai
- [ ] Lihat hasil: "Success. No rows returned" ✅

**Apa yang terjadi:**
- Membuat policies untuk authenticated users
- Membuat storage bucket 'images'
- Setup permissions untuk upload gambar

#### B. Verifikasi Storage Bucket

- [ ] Klik menu **"Storage"** (di sidebar kiri)
- [ ] Pastikan ada bucket bernama **"images"**
- [ ] Klik bucket "images"
- [ ] Klik **"Settings"** (icon gear)
- [ ] Pastikan **"Public bucket"** = ON ✅

**Jika bucket tidak ada:**
- Manual create: Storage → New bucket → Name: "images" → Public: ON

---

### Step 3: Buat Admin User (5 menit)

- [ ] Di Supabase Dashboard, klik menu **"Authentication"**
- [ ] Klik tab **"Users"**
- [ ] Klik tombol **"Add user"** (hijau, kanan atas)
- [ ] Isi form:
  - [ ] **Email**: `admin@kulturaindonesia.or.id` (atau email kamu)
  - [ ] **Password**: Buat password yang kuat (min 6 karakter)
  - [ ] **Auto Confirm User**: ✅ **HARUS DICENTANG!**
- [ ] Klik **"Create user"**
- [ ] User muncul di list? ✅ Berhasil!

**Catat credentials:**
```
Email: ___________________________
Password: _________________________
```

**Troubleshooting:**
- Error "Email already exists" → Email sudah terdaftar, pakai email lain
- Lupa password → Delete user, buat lagi

---

### Step 4: Test Dashboard (3 menit)

#### A. Jalankan Dev Server

- [ ] Buka terminal di folder project
- [ ] Jalankan: `npm run dev`
- [ ] Tunggu sampai muncul: `✓ Ready in 3.5s`
- [ ] Jangan tutup terminal!

#### B. Akses Dashboard

- [ ] Buka browser
- [ ] Buka URL: `http://localhost:3000/admin`
- [ ] Redirect ke login page? ✅ Bagus!

#### C. Login

- [ ] Isi form login:
  - [ ] Email: (email yang dibuat di Step 3)
  - [ ] Password: (password yang dibuat di Step 3)
- [ ] Klik **"Login"**
- [ ] Redirect ke dashboard? ✅ **BERHASIL!**

**Troubleshooting:**
- Error "Invalid login credentials" → Cek email/password benar
- Error "Failed to sign in" → Cek `.env.local` sudah benar
- Redirect ke login terus → Cek user sudah "confirmed" di Supabase

---

### Step 5: Test Fitur Dashboard (10 menit)

#### A. Test Dashboard Home

- [ ] Lihat statistik (Total Artikel, Published, Draft, dll)
- [ ] Angka muncul? ✅ Database connection OK

#### B. Test List Artikel

- [ ] Klik menu **"Artikel"** (di sidebar)
- [ ] Lihat list artikel
- [ ] Ada artikel sample? ✅ OK

#### C. Test Create Artikel

- [ ] Klik **"➕ Buat Artikel Baru"**
- [ ] Isi form:
  - [ ] **Judul**: "Test Artikel Dashboard"
  - [ ] **Slug**: auto-generate
  - [ ] **Konten**: Tulis sesuatu di editor
  - [ ] **Status**: Published
- [ ] Klik **"Publikasikan"**
- [ ] Artikel muncul di list? ✅ Create OK
- [ ] Buka website: `/publikasi/test-artikel-dashboard`
- [ ] Artikel tampil? ✅ **SEMPURNA!**

#### D. Test Upload Gambar

- [ ] Klik menu **"Media"**
- [ ] Klik atau drag & drop file gambar
- [ ] Upload berhasil? ✅ Storage OK
- [ ] Gambar muncul di grid? ✅ OK
- [ ] Klik **"📋 Copy"** untuk copy URL
- [ ] URL ter-copy? ✅ OK

#### E. Test Edit Artikel

- [ ] Kembali ke **"Artikel"**
- [ ] Klik **"✏️ Edit"** pada artikel test
- [ ] Form terbuka dengan data terisi? ✅ OK
- [ ] Ubah judul menjadi "Test Artikel Dashboard - Edited"
- [ ] Klik **"Update Artikel"**
- [ ] Perubahan tersimpan? ✅ Update OK

#### F. Test Toggle Status

- [ ] Di list artikel, klik badge **"Published"**
- [ ] Badge berubah jadi **"Draft"**? ✅ OK
- [ ] Buka website: `/publikasi/test-artikel-dashboard-edited`
- [ ] Artikel tidak tampil (404)? ✅ Draft working
- [ ] Toggle lagi ke **"Published"**
- [ ] Artikel tampil lagi? ✅ **SEMPURNA!**

#### G. Test Delete

- [ ] Klik **"🗑️ Hapus"** pada artikel test
- [ ] Konfirmasi muncul? ✅ OK
- [ ] Klik **"OK"**
- [ ] Artikel hilang dari list? ✅ Delete OK

---

## 🎉 Setup Complete!

### ✅ Semua yang Sudah Dicek:

- [x] Dependencies terinstall
- [x] SQL schema dijalankan
- [x] Storage bucket dibuat
- [x] Admin user dibuat
- [x] Login berhasil
- [x] Dashboard home berfungsi
- [x] List artikel berfungsi
- [x] Create artikel berfungsi
- [x] Upload gambar berfungsi
- [x] Edit artikel berfungsi
- [x] Toggle status berfungsi
- [x] Delete artikel berfungsi

**Dashboard Admin SIAP DIGUNAKAN!** 🚀

---

## 🚀 Next Steps

Sekarang kamu bisa:

1. **Buat Artikel Asli**
   - Tulis artikel pertama yang real
   - Upload gambar cover yang bagus
   - Publish ke website

2. **Upload Portofolio**
   - Tambah item portofolio
   - Upload gambar portfolio

3. **Tambah Kegiatan**
   - Input event/kegiatan yang sudah terjadi
   - Set tanggal & lokasi

4. **Deploy ke Production**
   ```bash
   git add .
   git commit -m "Add admin dashboard"
   git push origin main
   ```
   - Vercel auto-deploy
   - Dashboard live di: `https://kulturaindonesia.vercel.app/admin`

5. **Invite More Admins**
   - Buat user baru di Supabase Auth
   - Bagikan credentials ke tim

---

## 📚 Resources

- **Quick Start**: `SETUP_DASHBOARD.md`
- **Full Docs**: `DASHBOARD_README.md`
- **Summary**: `ADMIN_DASHBOARD_SUMMARY.md`
- **Help**: Buka issue atau hubungi developer

---

## 💡 Tips

### Keyboard Shortcuts (Rich Text Editor)
- **Bold**: Ctrl+B
- **Italic**: Ctrl+I
- **Underline**: Ctrl+U
- **Link**: Ctrl+K

### Best Practices
- ✅ Tulis artikel di Draft dulu, review, baru Publish
- ✅ Upload gambar ke Media Library dulu sebelum pakai
- ✅ Pakai slug yang SEO-friendly (huruf kecil, dash)
- ✅ Isi metadata (kategori, penulis) untuk organisasi

### Security
- ⚠️ Jangan share credentials admin
- ⚠️ Gunakan password yang kuat
- ⚠️ Logout setelah selesai (jika di komputer publik)

---

**Selamat! Dashboard admin siap digunakan.** 🎉

**Enjoy managing Kultura Indonesia website!** ✨
