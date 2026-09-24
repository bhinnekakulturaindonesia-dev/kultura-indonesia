# 🚀 Deploy Version 2 (dengan Dashboard Admin)

## 📋 Prerequisites

✅ Supabase sudah setup (lihat `setup-supabase.md`)
✅ Admin user sudah dibuat
✅ File `.env.local` sudah ada dengan credentials

---

## 🎯 Deploy ke Vercel (2 Cara)

### Cara 1: Via GitHub (Recommended - Auto Deploy)

```bash
# 1. Commit semua perubahan
git add .
git commit -m "Add admin dashboard v2"

# 2. Push ke branch baru
git push origin v2-admin-dashboard

# 3. Buat project baru di Vercel
# Buka: https://vercel.com/new
# - Import Git Repository
# - Pilih: bhinnekakulturaindonesia-dev/kultura-indonesia
# - Branch: v2-admin-dashboard
# - Project Name: kultura-indonesia-v2
# - Environment Variables:
#   NEXT_PUBLIC_SUPABASE_URL = [dari Supabase]
#   NEXT_PUBLIC_SUPABASE_ANON_KEY = [dari Supabase]
# - Deploy!

# 4. URL V2 akan jadi:
# https://kultura-indonesia-v2.vercel.app
```

---

### Cara 2: Via Vercel CLI (Cepat)

```bash
# 1. Install Vercel CLI (sekali aja)
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy sebagai project baru
vercel --name kultura-indonesia-v2

# Jawab pertanyaan:
# Set up and deploy? Y
# Which scope? [Your account]
# Link to existing project? N (buat baru)
# What's your project's name? kultura-indonesia-v2
# In which directory? ./ 
# Auto-detected settings okay? Y

# 4. Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste value dari Supabase

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste value dari Supabase

# 5. Deploy production
vercel --prod

# 6. Done! URL akan muncul di terminal
```

---

## 🔍 Verifikasi Deploy Berhasil

### Test URLs:

```bash
# Website public (harus jalan)
https://kultura-indonesia-v2.vercel.app

# Login admin (harus muncul form)
https://kultura-indonesia-v2.vercel.app/admin/login

# Dashboard (redirect ke login)
https://kultura-indonesia-v2.vercel.app/admin
```

### Test Login:
1. Buka: `/admin`
2. Login dengan email & password yang dibuat di Supabase
3. Harus redirect ke dashboard ✅
4. Lihat statistik & menu sidebar ✅

### Test Fitur:
- [ ] Login berhasil
- [ ] Dashboard home muncul
- [ ] List artikel muncul
- [ ] Bisa buka form artikel baru
- [ ] Rich text editor muncul
- [ ] Bisa upload gambar
- [ ] Logout berhasil

---

## 🎊 Selesai!

Version 2 sudah live dengan dashboard admin!

**URLs:**
- V1 (lama): https://kulturaindonesia.vercel.app (tanpa dashboard)
- V2 (baru): https://kultura-indonesia-v2.vercel.app (dengan dashboard)

**Credentials:**
```
Email: admin@kulturaindonesia.or.id
Password: [yang kamu buat]
```

---

## 🔄 Jika Sudah OK, Merge ke V1

Kalau V2 sudah dicoba & oke, bisa merge ke main:

```bash
# 1. Checkout ke main
git checkout main

# 2. Merge dari v2
git merge v2-admin-dashboard

# 3. Push ke main
git push origin main

# 4. Vercel akan auto-deploy ke V1
# Dashboard akan live di: https://kulturaindonesia.vercel.app/admin
```

Atau tetap pisah jika mau 2 versi terpisah!
