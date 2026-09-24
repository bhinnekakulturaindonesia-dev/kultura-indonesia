# 🎨 Kultura Indonesia - Dashboard Admin

Dashboard admin untuk mengelola konten website Kultura Indonesia tanpa perlu edit kode. Mirip WordPress!

## ✨ Fitur Dashboard

### 📝 Management Artikel
- ✅ Buat artikel baru dengan rich text editor
- ✅ Edit artikel existing
- ✅ Toggle status: Draft ↔️ Published
- ✅ Upload gambar cover
- ✅ Auto-generate slug dari judul
- ✅ Kategori dan metadata
- ✅ Preview sebelum publish

### 🎨 Management Portofolio
- ✅ Tambah/edit/hapus item portofolio
- ✅ Upload gambar portofolio
- ✅ Set urutan tampilan
- ✅ Link ke resource eksternal

### 📅 Management Kegiatan
- ✅ Tambah/edit/hapus kegiatan/event
- ✅ Set tanggal dan lokasi
- ✅ Upload foto kegiatan

### 🖼️ Media Library
- ✅ Upload multiple images sekaligus
- ✅ Copy URL gambar dengan 1 klik
- ✅ Delete gambar yang tidak terpakai
- ✅ Preview semua gambar

### 📊 Dashboard Home
- ✅ Statistik: Total artikel, published, draft, portofolio, kegiatan
- ✅ Quick actions untuk buat konten baru

## 🚀 Setup Dashboard

### 1. Install Dependencies
```bash
npm install
```

Dependencies tambahan yang diperlukan:
- `react-quill` - Rich text editor untuk artikel
- `@supabase/ssr` - Supabase authentication

### 2. Setup Supabase (Jika Belum)

#### a. Jalankan SQL Schema Baru
Buka **Supabase Dashboard → SQL Editor** dan jalankan file `supabase/schema.sql` yang sudah diupdate. Ini akan:
- Membuat policies untuk authenticated users
- Membuat storage bucket 'images'
- Setup permissions untuk upload/delete gambar

#### b. Buat User Admin
Di **Supabase Dashboard → Authentication → Users**, klik **"Add user"**:
- Email: `admin@kulturaindonesia.or.id` (atau email kamu)
- Password: buat password yang kuat
- ✅ Centang "Auto Confirm User"

> 💡 **Tip**: Kamu bisa buat multiple admin users dengan cara yang sama

#### c. Enable Email Auth (Optional)
Jika ingin admin bisa reset password via email:
1. **Authentication → Settings → Email Auth**
2. Aktifkan "Enable Email Signups"
3. Configure SMTP (atau pakai Supabase default)

### 3. Update Environment Variables
Pastikan file `.env.local` sudah ada dan berisi:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

### 4. Jalankan Development Server
```bash
npm run dev
```

Dashboard admin akan tersedia di: **http://localhost:3000/admin**

## 🔐 Login ke Dashboard

1. Buka: `http://localhost:3000/admin` atau `https://kulturaindonesia.vercel.app/admin`
2. Login dengan email dan password yang dibuat di Supabase
3. Kamu akan diredirect ke dashboard

## 📖 Cara Pakai

### Buat Artikel Baru

1. **Dashboard → Artikel → ➕ Buat Artikel Baru**
2. Isi form:
   - **Judul**: Judul artikel (slug auto-generate)
   - **Ringkasan**: Summary singkat
   - **Konten**: Tulis dengan rich text editor (bold, italic, list, dll)
   - **Gambar Cover**: Upload atau paste URL
   - **Kategori**: Contoh: "Media & Agama"
   - **Status**: 
     - **Draft** = Tidak tampil di website
     - **Published** = Tampil di website
3. Klik **"Publikasikan"** atau **"Update Artikel"**

### Upload Gambar

Ada 2 cara:

#### Cara 1: Lewat Media Library
1. **Dashboard → Media → Upload Gambar**
2. Pilih file atau drag & drop (bisa multiple)
3. Setelah upload, klik tombol **📋 Copy** untuk copy URL
4. Paste URL di form artikel/portofolio/kegiatan

#### Cara 2: Upload Langsung di Form Artikel
1. Saat buat/edit artikel
2. Sidebar kanan → **Gambar Cover → 📤 Upload Gambar**
3. Pilih file → Upload otomatis
4. Gambar langsung muncul di preview

### Tambah Portofolio

1. **Dashboard → Portofolio → ➕ Tambah Portofolio**
2. Isi form dalam modal
3. **Urutan**: Angka untuk sorting (1, 2, 3, dst)
4. Klik **"Simpan"**

### Tambah Kegiatan

1. **Dashboard → Kegiatan → ➕ Tambah Kegiatan**
2. Isi form: judul, deskripsi, tanggal, lokasi
3. Upload gambar kegiatan
4. Klik **"Simpan"**

## 🎯 Tips & Tricks

### Slug Artikel
- Slug auto-generate dari judul
- Format: `judul-artikel-seperti-ini`
- Slug = URL artikel: `/publikasi/judul-artikel-seperti-ini`
- Bisa diedit manual jika perlu

### Status Draft vs Published
- **Draft**: Artikel tersimpan tapi tidak tampil di website
- **Published**: Artikel tampil di `/publikasi`
- Kamu bisa toggle status kapan saja (klik badge status di list artikel)

### Upload Gambar
- **Max size**: 5MB (untuk media library) atau 2MB (untuk artikel form)
- **Format**: JPG, PNG, GIF, WebP
- **Storage**: Gambar disimpan di Supabase Storage (bukan di folder public)
- **URL**: Auto-generate public URL yang bisa langsung dipakai

### Rich Text Editor
Editor menggunakan **Quill** dengan fitur:
- Header (H1, H2, H3)
- Bold, Italic, Underline, Strikethrough
- Bullet list & Numbered list
- Blockquote & Code block
- Text alignment
- Link & Image (via URL)

## 🔒 Keamanan

### Row Level Security (RLS)
- ✅ Public hanya bisa **read** artikel published, portofolio, kegiatan
- ✅ Authenticated users bisa **CRUD** semua tabel
- ✅ Public bisa **view** gambar di storage
- ✅ Authenticated users bisa **upload/delete** gambar

### Authentication
- Login required untuk akses dashboard
- Session management via Supabase Auth
- Auto-redirect ke `/admin/login` jika belum login

## 🛠️ Troubleshooting

### Error: "Failed to upload image"
**Solusi**: 
1. Pastikan storage bucket 'images' sudah dibuat
2. Cek policies di Supabase Dashboard → Storage → Policies
3. Jalankan ulang SQL schema jika perlu

### Error: "Failed to create artikel"
**Solusi**:
1. Cek policies di tabel `artikel`
2. Pastikan user sudah authenticated
3. Cek console browser untuk error detail

### Tidak bisa login
**Solusi**:
1. Pastikan user sudah dibuat di Supabase Auth
2. Cek email/password benar
3. Pastikan "Auto Confirm User" dicentang saat buat user

### Gambar tidak muncul
**Solusi**:
1. Cek URL gambar valid
2. Pastikan storage bucket 'images' public
3. Cek policy "Public can view images"

## 📦 Deploy ke Vercel

Dashboard sudah include dalam project, deploy seperti biasa:

```bash
git add .
git commit -m "Add admin dashboard"
git push origin main
```

Dashboard akan otomatis deploy di: `https://your-domain.vercel.app/admin`

## 🎓 Struktur File Dashboard

```
app/
├── admin/
│   ├── page.js                      # Dashboard home
│   ├── login/page.js                # Login page
│   ├── artikel/
│   │   ├── page.js                  # List artikel
│   │   ├── new/page.js              # Create artikel
│   │   └── edit/[id]/page.js        # Edit artikel
│   ├── portofolio/page.js           # Manage portofolio
│   ├── kegiatan/page.js             # Manage kegiatan
│   └── media/page.js                # Media library

components/admin/
├── AdminLayout.js                   # Sidebar & wrapper
└── ArtikelForm.js                   # Form create/edit artikel

middleware/
└── auth.js                          # Auth helper functions
```

## 🚀 Next Steps

Setelah setup dashboard, kamu bisa:
1. ✅ Buat artikel tanpa coding
2. ✅ Upload gambar dengan mudah
3. ✅ Manage semua konten dari browser
4. ✅ Tidak perlu login Supabase lagi!

---

**Butuh bantuan?** Open issue di GitHub atau hubungi developer.

Selamat mengelola website Kultura Indonesia! 🎉
