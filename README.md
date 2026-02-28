# Kultura Indonesia — Next.js + Supabase + Vercel

Website resmi Kultura Indonesia dibangun dengan stack modern: Next.js 14, Supabase, dan di-deploy ke Vercel.

## Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel (auto-deploy dari GitHub)

---

## Cara Setup (Step by Step)

### 1. Setup Supabase

1. Login ke [supabase.com](https://supabase.com) → buat project baru
2. Buka **SQL Editor** → klik **New Query**
3. Copy-paste isi file `supabase/schema.sql` → klik **Run**
4. Buka **Project Settings → API**:
   - Salin **Project URL**
   - Salin **anon / public key**

### 2. Setup Project Lokal

```bash
# Clone repo
git clone https://github.com/USERNAME/kultura-indonesia.git
cd kultura-indonesia

# Install dependencies
npm install

# Buat file .env.local
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
```

```bash
# Jalankan dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 3. Push ke GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 4. Deploy ke Vercel

1. Login ke [vercel.com](https://vercel.com)
2. Klik **Add New Project** → Import repo GitHub kamu
3. Di bagian **Environment Variables**, tambahkan:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Klik **Deploy** → selesai! 🎉

---

## Cara Tambah Konten

Semua konten dikelola langsung dari **Supabase Dashboard → Table Editor**:

| Tabel | Isi |
|-------|-----|
| `artikel` | Artikel/publikasi. Set `status = 'published'` agar tampil |
| `portofolio` | Item portofolio dengan gambar dan link |
| `kegiatan` | Event dan kegiatan dengan tanggal & lokasi |

### Field penting untuk `artikel`:
- `slug` — URL unik, contoh: `nama-artikel-saya` (tanpa spasi)
- `status` — `draft` (tidak tampil) atau `published` (tampil)
- `konten` — Isi artikel dalam format HTML
- `gambar_url` — URL gambar cover

---

## Struktur Project

```
kultura-indonesia/
├── app/
│   ├── layout.js          # Layout utama + Navbar + Footer
│   ├── page.js            # Beranda
│   ├── artikel/
│   │   ├── page.js        # Daftar artikel
│   │   └── [slug]/page.js # Detail artikel
│   ├── portofolio/page.js
│   ├── kegiatan/page.js
│   └── tentang-kami/page.js
├── components/
│   ├── Navbar.js
│   ├── Footer.js
│   └── ArticleCard.js
├── lib/
│   └── supabase.js        # Supabase client
└── supabase/
    └── schema.sql         # SQL untuk buat tabel
```
