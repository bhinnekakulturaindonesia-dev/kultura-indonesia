# 🚀 START HERE - Dashboard Admin Kultura Indonesia

> **Selamat! Dashboard admin WordPress-style sudah siap. Tinggal setup!**

---

## 📌 Apa yang Sudah Dibuat?

✨ **Dashboard admin lengkap** untuk manage website **tanpa edit kode**!

### Fitur:
- ✅ Buat artikel dengan rich text editor
- ✅ Upload gambar drag & drop
- ✅ Manage portofolio & kegiatan
- ✅ Toggle draft/published
- ✅ Media library

---

## 🎯 Pilih Jalur Kamu

### 🏃‍♂️ Jalur Cepat (Untuk yang Terburu-buru)

**3 Langkah Simpel:**

```bash
# 1. Install
npm install

# 2. Setup Supabase
# - Jalankan supabase/schema.sql di SQL Editor
# - Buat admin user di Auth → Users

# 3. Test!
npm run dev
# Buka: http://localhost:3000/admin
```

📖 **Dokumentasi**: `SETUP_DASHBOARD.md`

---

### 📚 Jalur Lengkap (Untuk yang Ingin Paham)

**Step-by-step dengan penjelasan:**

1. **Baca dulu**: `ADMIN_DASHBOARD_SUMMARY.md`
   - Penjelasan lengkap apa yang sudah dibuat
   - Struktur file & folder
   - Fitur-fitur dashboard

2. **Setup**: Ikuti `CHECKLIST_SETUP.md`
   - Checklist lengkap dengan checkbox
   - Troubleshooting tips
   - Test setiap fitur

3. **Dokumentasi**: `DASHBOARD_README.md`
   - Cara pakai dashboard
   - Screenshots & examples
   - Best practices

---

### 🎓 Jalur Belajar (Untuk Developer)

**Ingin tahu bagaimana dashboard dibuat?**

Lihat struktur file:
```
app/admin/                     # Dashboard routes
components/admin/              # Reusable components
middleware/auth.js             # Authentication helpers
supabase/schema.sql            # Database schema + policies
```

File utama:
- `app/admin/page.js` - Dashboard home
- `components/admin/AdminLayout.js` - Layout dengan sidebar
- `components/admin/ArtikelForm.js` - Form artikel dengan rich text editor

---

## 🎬 Quick Start (Copy-Paste Friendly)

### Terminal 1: Setup
```bash
# Clone (jika belum)
git pull

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

### Browser: Setup Supabase

**1. SQL Editor**
```
https://supabase.com/dashboard
→ SQL Editor 
→ New Query
→ Copy-paste isi file: supabase/schema.sql
→ Run
```

**2. Create Admin**
```
https://supabase.com/dashboard
→ Authentication 
→ Users
→ Add user
   Email: admin@kulturaindonesia.or.id
   Password: [buat-password-kuat]
   ✅ Auto Confirm User
→ Create user
```

**3. Login Dashboard**
```
http://localhost:3000/admin
→ Login dengan email & password
→ Done! 🎉
```

---

## 📂 File Dokumentasi

| File | Isi |
|------|-----|
| `START_HERE.md` | ⭐ File ini - panduan awal |
| `SETUP_DASHBOARD.md` | 🚀 Quick start guide (5 menit) |
| `CHECKLIST_SETUP.md` | ✅ Checklist step-by-step dengan checkbox |
| `DASHBOARD_README.md` | 📖 Dokumentasi lengkap dashboard |
| `ADMIN_DASHBOARD_SUMMARY.md` | 📋 Summary semua yang dibuat |
| `scripts/create-admin.md` | 👤 Cara buat admin user |

---

## 🤔 FAQ

### Q: Apakah saya perlu coding untuk pakai dashboard?
**A:** Tidak! Dashboard sudah jadi, tinggal setup & pakai.

### Q: Apakah dashboard otomatis deploy ke Vercel?
**A:** Ya! Push ke GitHub, Vercel auto-deploy. Dashboard tersedia di `/admin`.

### Q: Berapa lama setup?
**A:** ~15 menit total (install + setup Supabase + test).

### Q: Apakah bisa multiple admin?
**A:** Ya! Buat user baru di Supabase Auth → Users.

### Q: Apakah data aman?
**A:** Ya! Row Level Security aktif. Public hanya bisa read, admin bisa CRUD.

### Q: Bagaimana cara upload gambar?
**A:** 2 cara: (1) Upload di Media Library → Copy URL, (2) Upload langsung di form artikel.

### Q: Apakah bisa edit artikel yang sudah ada?
**A:** Ya! Klik "Edit" di list artikel.

### Q: Apakah bisa preview sebelum publish?
**A:** Ya! Set status "Draft" dulu, lihat preview, baru ubah ke "Published".

---

## ⚡ Troubleshooting Cepat

### ❌ npm install error
```bash
npm install --force
```

### ❌ Login gagal
- Cek user sudah dibuat di Supabase Auth
- Cek "Auto Confirm User" dicentang
- Cek email/password benar

### ❌ Upload gambar gagal
- Cek SQL schema sudah dijalankan
- Cek storage bucket "images" ada & public

### ❌ Tidak bisa create artikel
- Cek SQL schema sudah dijalankan
- Cek sudah login sebagai authenticated user

---

## 🎯 Langkah Selanjutnya

Setelah setup berhasil:

1. **Login ke dashboard**
   ```
   http://localhost:3000/admin
   ```

2. **Buat artikel pertama**
   - Dashboard → Artikel → ➕ Buat Artikel Baru
   - Tulis judul & konten
   - Upload gambar
   - Publish!

3. **Upload gambar**
   - Dashboard → Media → Upload gambar
   - Copy URL untuk dipakai

4. **Tambah portofolio**
   - Dashboard → Portofolio → ➕ Tambah Portofolio
   - Isi form → Simpan

5. **Deploy ke production**
   ```bash
   git add .
   git commit -m "Setup admin dashboard"
   git push origin main
   ```
   - Vercel auto-deploy
   - Dashboard live: `https://kulturaindonesia.vercel.app/admin`

---

## 💡 Pro Tips

### Workflow Terbaik
1. Draft dulu (status = draft)
2. Review konten
3. Preview di website
4. Publish (status = published)

### Keyboard Shortcuts
- Bold: `Ctrl+B`
- Italic: `Ctrl+I`
- Save: `Ctrl+S` (auto-save on submit)

### Best Practices
- Upload gambar ke Media Library dulu
- Pakai slug yang SEO-friendly
- Isi metadata (kategori, penulis)
- Review sebelum publish

---

## 🎉 Selesai!

**Dashboard Admin Sudah Siap!**

Pilih file dokumentasi yang sesuai kebutuhan:
- 🏃‍♂️ Cepat? → `SETUP_DASHBOARD.md`
- 📝 Detail? → `CHECKLIST_SETUP.md`
- 📖 Lengkap? → `DASHBOARD_README.md`

**Happy Managing! 🚀**

---

## 📞 Need Help?

- 📖 Baca dokumentasi lengkap
- 🔍 Cek troubleshooting section
- 💬 Open issue di GitHub
- 📧 Hubungi developer

---

**Made with ❤️ by Kiro AI**

*Dashboard ini dibuat dengan AI untuk memudahkan pengelolaan website Kultura Indonesia* ✨
