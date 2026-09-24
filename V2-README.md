# 🎨 Kultura Indonesia V2 - With Admin Dashboard

> Version 2 dengan dashboard admin lengkap untuk manage konten tanpa edit kode!

## 🆚 Perbedaan V1 vs V2

| Feature | V1 (Current) | V2 (New) |
|---------|-------------|----------|
| **Website Public** | ✅ | ✅ |
| **Dashboard Admin** | ❌ | ✅ |
| **Upload Artikel** | Edit code | Via dashboard |
| **Upload Gambar** | Manual | Via media library |
| **Toggle Draft/Publish** | Edit code | 1 klik |
| **Rich Text Editor** | ❌ | ✅ |

## 🚀 Quick Start

### 1. Setup Supabase (Wajib!)
```bash
# Ikuti panduan:
cat scripts/setup-supabase.md

# Atau buka: scripts/setup-supabase.md
```

**Yang perlu dilakukan:**
- [ ] Jalankan SQL schema di Supabase
- [ ] Buat admin user
- [ ] Copy credentials ke .env.local

### 2. Test Local
```bash
# Install dependencies
npm install

# Jalankan dev server
npm run dev

# Buka browser:
http://localhost:3000/admin
```

### 3. Deploy V2 to Vercel
```bash
# Ikuti panduan:
cat scripts/deploy-v2.md

# Atau buka: scripts/deploy-v2.md
```

## 🎯 URLs

**Local:**
- Website: http://localhost:3000
- Dashboard: http://localhost:3000/admin

**Production V1 (lama):**
- Website: https://kulturaindonesia.vercel.app
- Dashboard: ❌ Tidak ada

**Production V2 (baru):**
- Website: https://kultura-indonesia-v2.vercel.app
- Dashboard: https://kultura-indonesia-v2.vercel.app/admin ✅

## 🔑 Login Credentials

Setelah setup Supabase:
```
Email: admin@kulturaindonesia.or.id
Password: [yang kamu buat di Supabase]
```

## 📚 Dokumentasi Lengkap

| File | Isi |
|------|-----|
| `START_HERE.md` | Panduan awal |
| `SETUP_DASHBOARD.md` | Setup lengkap dashboard |
| `DASHBOARD_README.md` | Dokumentasi dashboard |
| `scripts/setup-supabase.md` | Setup Supabase |
| `scripts/deploy-v2.md` | Deploy V2 |
| `CHECKLIST_SETUP.md` | Checklist lengkap |

## ✨ Fitur Dashboard

### 📝 Artikel Management
- Buat artikel dengan rich text editor
- Toggle draft ↔️ published
- Upload gambar cover
- Auto-generate slug
- Edit & delete artikel

### 🎨 Portofolio Management
- Tambah/edit/hapus portofolio
- Upload gambar
- Set urutan tampilan

### 📅 Kegiatan Management
- Tambah/edit/hapus kegiatan
- Set tanggal & lokasi
- Upload foto

### 🖼️ Media Library
- Upload multiple images
- Copy URL dengan 1 klik
- Delete images

## 🔒 Keamanan

- ✅ URL `/admin` tidak ada link di website (rahasia)
- ✅ Login required dengan Supabase Auth
- ✅ Row Level Security aktif
- ✅ HTTPS/SSL encryption
- ✅ Environment variables encrypted

## 💰 Biaya

```
Vercel (hosting): Rp 0/bulan (GRATIS)
Supabase (database): Rp 0/bulan (GRATIS)
Total: Rp 0/bulan ✨
```

## 🆘 Troubleshooting

### Tidak bisa login
- Cek admin user sudah dibuat di Supabase
- Cek "Auto Confirm User" dicentang
- Cek .env.local sudah benar

### Upload gambar gagal
- Cek storage bucket "images" sudah dibuat
- Cek bucket setting "Public" = ON
- Cek SQL schema sudah dijalankan

### Dashboard tidak muncul
- Cek environment variables sudah diset di Vercel
- Cek deploy berhasil (tidak ada error)
- Clear cache browser (Ctrl+Shift+R)

## 📞 Support

Butuh bantuan? Lihat:
- `DASHBOARD_README.md` - Dokumentasi lengkap
- `CHECKLIST_SETUP.md` - Checklist step-by-step
- GitHub Issues - Report bug

---

**Made with ❤️ by Kiro AI for Kultura Indonesia**

🎉 Selamat! Dashboard admin siap digunakan!
