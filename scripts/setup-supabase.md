# 🚀 Setup Supabase - Panduan Otomatis

## ⚡ Quick Start (5 Menit)

### Step 1: Buka Supabase Dashboard
```
https://supabase.com/dashboard
```

### Step 2: Jalankan SQL Schema
1. Klik project **Kultura Indonesia**
2. Klik menu **SQL Editor** (sidebar kiri)
3. Klik **New Query**
4. Copy-paste isi file `supabase/schema.sql`
5. Klik **Run** (atau Ctrl+Enter)
6. Tunggu: **"Success. No rows returned"** ✅

### Step 3: Buat Admin User
1. Klik menu **Authentication** (sidebar kiri)
2. Klik tab **Users**
3. Klik **Add user** (tombol hijau)
4. Isi form:
   ```
   Email: admin@kulturaindonesia.or.id
   Password: [buat password min 6 karakter]
   ✅ CENTANG "Auto Confirm User" (WAJIB!)
   ```
5. Klik **Create user**
6. User muncul di list ✅

### Step 4: Verifikasi Storage Bucket
1. Klik menu **Storage** (sidebar kiri)
2. Cari bucket **"images"**
3. Jika ADA: ✅ Selesai!
4. Jika TIDAK ADA:
   - Klik **New bucket**
   - Name: `images`
   - ✅ Centang "Public bucket"
   - Klik **Create bucket**

### Step 5: Get Credentials
1. Klik menu **Settings** → **API**
2. Copy nilai ini:
   ```
   Project URL: https://xxxxx.supabase.co
   anon/public key: eyJhbGc...
   ```
3. Simpan di file `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

---

## ✅ Checklist

- [ ] SQL schema dijalankan (Success)
- [ ] Admin user dibuat
- [ ] "Auto Confirm User" dicentang
- [ ] Storage bucket "images" ada & public
- [ ] Credentials disimpan di .env.local

---

## 🎉 Selesai!

Supabase siap! Lanjut ke deploy Vercel.

Login credentials:
```
Email: admin@kulturaindonesia.or.id
Password: [yang kamu buat tadi]
```

Dashboard akan accessible di:
```
http://localhost:3000/admin (local)
https://kulturaindonesia-v2.vercel.app/admin (production)
```
