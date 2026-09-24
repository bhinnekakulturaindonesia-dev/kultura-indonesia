# 🎨 Dashboard Admin Kultura Indonesia

> **Dashboard admin lengkap untuk mengelola website tanpa perlu edit kode - mirip WordPress!**

![Dashboard](https://img.shields.io/badge/Status-Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Supabase](https://img.shields.io/badge/Supabase-Powered-green)

---

## 🚀 Quick Start (3 Menit)

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Setup Supabase

**A. Jalankan SQL**
- Buka [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
- Copy-paste isi file `supabase/schema.sql`
- Klik **Run**

**B. Buat Admin User**
- Authentication → Users → **Add user**
- Email: `admin@kulturaindonesia.or.id`
- Password: (buat password kuat)
- ✅ Centang **"Auto Confirm User"**
- Klik **Create user**

### 3️⃣ Jalankan & Login
```bash
npm run dev
```

Buka browser: **http://localhost:3000/admin**

---

## ✨ Fitur Dashboard

### 📝 Artikel Management
- ✅ Buat artikel dengan **rich text editor** (bold, italic, heading, list, dll)
- ✅ Upload gambar cover
- ✅ Auto-generate slug dari judul
- ✅ Toggle status: **Draft** ↔️ **Published**
- ✅ Edit & delete artikel

### 🎨 Portofolio Management
- ✅ Tambah/edit/hapus item portofolio
- ✅ Upload gambar portofolio
- ✅ Set urutan tampilan

### 📅 Kegiatan Management
- ✅ Tambah/edit/hapus kegiatan/event
- ✅ Set tanggal & lokasi
- ✅ Upload foto kegiatan

### 🖼️ Media Library
- ✅ Upload multiple images sekaligus
- ✅ Copy URL gambar dengan 1 klik
- ✅ Delete gambar yang tidak terpakai

### 📊 Dashboard Home
- ✅ Statistik: Total artikel, published, draft, portofolio, kegiatan
- ✅ Quick actions untuk buat konten baru

---

## 📸 Screenshot

### Dashboard Home
```
┌─────────────────────────────────────────────────────────┐
│  Dashboard                                               │
│  Selamat datang kembali, admin@kultura.or.id           │
│                                                          │
│  📝 Total Artikel    ✅ Published    📋 Draft           │
│      15                  12              3               │
│                                                          │
│  🎨 Portofolio       📅 Kegiatan                        │
│      8                  10                               │
│                                                          │
│  Quick Actions:                                          │
│  [➕ Buat Artikel Baru]  [➕ Tambah Portofolio]         │
│  [➕ Tambah Kegiatan]                                   │
└─────────────────────────────────────────────────────────┘
```

### Rich Text Editor
```
┌─────────────────────────────────────────────────────────┐
│  Buat Artikel Baru                                       │
│                                                          │
│  Judul: █                                                │
│  Slug:  judul-artikel-baru (auto-generate)              │
│                                                          │
│  ┌─ Rich Text Editor ─────────────────────────────┐    │
│  │ [B] [I] [U] [H] [•] [1.] [<>] [≡] [🔗] [📷]  │    │
│  │                                                 │    │
│  │ Tulis konten artikel di sini...                │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  Sidebar:                                                │
│  - Upload Gambar Cover                                   │
│  - Status: [Draft] [Published]                          │
│  - Kategori                                              │
│                                                          │
│  [Publikasikan]                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📖 Cara Pakai

### 1. Upload Artikel Baru

```
Dashboard → Artikel → ➕ Buat Artikel Baru
```

1. **Judul**: Tulis judul artikel
   - Slug otomatis di-generate: `judul-artikel-baru`
   
2. **Konten**: Tulis dengan rich text editor
   - Bold, italic, underline
   - Heading 1, 2, 3
   - Bullet list, numbered list
   - Blockquote, code block
   - Link & image
   
3. **Gambar Cover**:
   - **Opsi 1**: Upload file (max 2MB)
   - **Opsi 2**: Paste URL dari Media Library
   
4. **Metadata**:
   - Kategori: `Media & Agama`
   - Penulis: Nama penulis (optional)
   - Tanggal publikasi
   
5. **Status**:
   - **Draft**: Tidak tampil di website
   - **Published**: Tampil di `/publikasi`
   
6. Klik **"Publikasikan"**

✅ **Done!** Artikel langsung muncul di website.

### 2. Upload Gambar

**Cara 1: Via Media Library (Recommended)**
```
Dashboard → Media → Upload Gambar
```
- Pilih file atau drag & drop (bisa multiple files)
- Tunggu upload selesai
- Klik **📋 Copy** untuk copy URL
- Paste URL di form artikel/portofolio

**Cara 2: Langsung di Form Artikel**
```
Form Artikel → Sidebar → 📤 Upload Gambar
```
- Pilih file
- Auto-upload & preview
- Gambar langsung tersimpan

### 3. Toggle Status Artikel

```
Dashboard → Artikel → Klik badge status
```

- Klik badge **"Draft"** → Jadi **"Published"**
- Klik badge **"Published"** → Jadi **"Draft"**
- Otomatis tersimpan

### 4. Edit Artikel

```
Dashboard → Artikel → ✏️ Edit
```

- Form sama seperti saat create
- Semua data sudah terisi
- Edit yang perlu
- Klik **"Update Artikel"**

---

## 🗂️ Struktur Dashboard

```
/admin                      → Dashboard home (statistik)
/admin/login                → Login page
/admin/artikel              → List semua artikel
/admin/artikel/new          → Buat artikel baru
/admin/artikel/edit/[id]    → Edit artikel
/admin/portofolio           → Kelola portofolio
/admin/kegiatan             → Kelola kegiatan
/admin/media                → Media library
```

---

## 🔒 Security & Permissions

### Row Level Security (RLS)
```sql
-- Public (tidak login):
✅ Read artikel yang published
✅ Read semua portofolio
✅ Read semua kegiatan
✅ View gambar di storage

-- Authenticated (sudah login):
✅ Create/Read/Update/Delete artikel
✅ Create/Read/Update/Delete portofolio
✅ Create/Read/Update/Delete kegiatan
✅ Upload/Delete gambar
```

### Authentication
- Login via Supabase Auth
- Session-based (auto-logout jika expired)
- Protected routes (redirect ke `/admin/login` jika belum login)

---

## 🛠️ Troubleshooting

### ❌ "Failed to upload image"
**Penyebab**: Storage bucket belum dibuat

**Solusi**:
1. Jalankan ulang `supabase/schema.sql`
2. Atau manual: Supabase → Storage → Create bucket "images" (public)

### ❌ "Failed to create artikel"
**Penyebab**: Policies belum dibuat

**Solusi**:
1. Jalankan ulang `supabase/schema.sql`
2. Cek Supabase → Authentication → Policies

### ❌ Tidak bisa login
**Penyebab**: User belum dibuat atau belum confirmed

**Solusi**:
1. Buka Supabase → Authentication → Users
2. Pastikan user ada
3. Pastikan "Email Confirmed" = true
4. Jika belum, klik "..." → Confirm email

### ❌ Gambar tidak muncul
**Penyebab**: URL gambar salah atau bucket tidak public

**Solusi**:
1. Cek URL gambar valid
2. Supabase → Storage → Bucket "images" → Settings → Public = ON

---

## 📦 Deploy ke Production

Dashboard sudah include dalam project, deploy seperti biasa:

```bash
git add .
git commit -m "Add admin dashboard"
git push origin main
```

Vercel akan auto-deploy. Dashboard tersedia di:
```
https://kulturaindonesia.vercel.app/admin
```

### Environment Variables (Vercel)
Sudah ada di Vercel project settings:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

---

## 🎓 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14 (App Router) |
| UI | Tailwind CSS |
| Rich Text | React Quill |
| Auth | Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |
| Deploy | Vercel |

---

## 📚 Dokumentasi Lengkap

- **Quick Start**: `SETUP_DASHBOARD.md`
- **Full Documentation**: `DASHBOARD_README.md`
- **Summary**: `ADMIN_DASHBOARD_SUMMARY.md`
- **Create Admin**: `scripts/create-admin.md`

---

## 🎉 Selesai!

Dashboard admin sudah **siap digunakan**!

Sekarang kamu bisa:
- ✅ Buat artikel tanpa coding
- ✅ Upload gambar dengan mudah
- ✅ Manage semua konten dari browser
- ✅ Tidak perlu edit kode lagi!

**Enjoy managing your website! 🚀**

---

## 💬 Support

Butuh bantuan? 
- 📖 Baca dokumentasi lengkap di `DASHBOARD_README.md`
- 🔧 Cek troubleshooting di atas
- 💌 Hubungi developer

---

**Made with ❤️ by Kiro AI for Kultura Indonesia**

*Dashboard ini dibuat 100% by AI tanpa human intervention* 😎
