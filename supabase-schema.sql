-- ============================================================
-- KULTURA INDONESIA — Supabase Schema
-- Jalankan script ini di Supabase SQL Editor
-- Dashboard → SQL Editor → New query → paste → Run
-- ============================================================

-- ── Tabel: articles ──────────────────────────────────────────
create table if not exists public.articles (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        not null unique,
  excerpt      text,
  content      text,                    -- HTML atau Markdown
  image_url    text,
  category     text,
  published    boolean     default false,
  published_at timestamptz default now(),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

-- ── Tabel: portofolio ────────────────────────────────────────
create table if not exists public.portofolio (
  id          uuid    primary key default gen_random_uuid(),
  title       text    not null,
  description text,
  image_url   text,
  link        text,
  year        int,
  created_at  timestamptz default now()
);

-- ── Tabel: kegiatan ──────────────────────────────────────────
create table if not exists public.kegiatan (
  id          uuid    primary key default gen_random_uuid(),
  title       text    not null,
  description text,
  image_url   text,
  date        date,
  location    text,
  created_at  timestamptz default now()
);

-- ── Enable Row Level Security ─────────────────────────────────
alter table public.articles  enable row level security;
alter table public.portofolio enable row level security;
alter table public.kegiatan   enable row level security;

-- ── RLS Policies: baca publik, tulis hanya anon key ──────────
-- Siapapun bisa baca artikel yang sudah dipublish
create policy "Public can read published articles"
  on public.articles for select
  using (published = true);

-- Siapapun bisa baca portofolio
create policy "Public can read portofolio"
  on public.portofolio for select
  using (true);

-- Siapapun bisa baca kegiatan
create policy "Public can read kegiatan"
  on public.kegiatan for select
  using (true);

-- ── Sample data ───────────────────────────────────────────────
insert into public.articles (title, slug, excerpt, content, image_url, category, published, published_at)
values
  (
    'Proyek Ideologis Animasi Nussa',
    'proyek-ideologis-animasi-nussa',
    'Tulisan ini membahas animasi "Nussa" sebagai sebuah tayangan keluarga Islami yang berupaya menampilkan nilai-nilai toleransi berbasis keagamaan.',
    '<p>Tulisan ini membahas animasi "Nussa" sebagai sebuah tayangan keluarga Islami yang berupaya menampilkan nilai-nilai toleransi berbasis keagamaan.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-09-at-13.16.37.jpeg',
    'Budaya',
    true,
    '2022-06-09'
  ),
  (
    'Horseback Archery dan Komodifikasi berbasis Agama',
    'horseback-archery-dan-komodifikasi-berbasis-agama',
    'Tulisan ini membahas fenomena komodifikasi berbasis agama berbentuk olahraga dan pelatihan berkuda-memanah yang dimobilisasi melalui media sosial.',
    '<p>Tulisan ini membahas fenomena komodifikasi berbasis agama berbentuk olahraga dan pelatihan berkuda-memanah yang dimobilisasi melalui media sosial.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/05/Untitled-design.png',
    'Agama',
    true,
    '2022-05-01'
  ),
  (
    'Tren Percakapan Halal Versi Warganet Sepanjang 2021',
    'tren-percakapan-halal-versi-warganet-sepanjang-2021',
    'Tulisan ini mengulas percakapan warganet di platform Twitter mengenai label halal pada makanan, kosmetik, dan produk lain.',
    '<p>Tulisan ini mengulas percakapan warganet di platform Twitter mengenai label halal pada makanan, kosmetik, dan produk lain.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/02/Semangat-Halal-00.jpg',
    'Media Sosial',
    true,
    '2022-02-10'
  ),
  (
    'Kritik Warganet terhadap Kinerja Polisi dalam Tagar #PercumaLaporPolisi',
    'kritik-warganet-tagar-percuma-lapor-polisi',
    'Tulisan ini membahas tentang tagar #PercumaLaporPolisi yang menyoroti kinerja institusi kepolisian di Indonesia pada 2021.',
    '<p>Tulisan ini membahas tentang tagar #PercumaLaporPolisi yang menyoroti kinerja institusi kepolisian di Indonesia pada 2021.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/01/WhatsApp-Image-2022-01-10-at-14.35.12.jpeg',
    'Media Sosial',
    true,
    '2022-01-10'
  ),
  (
    'Percakapan-Percakapan mengenai Arogansi TNI di Indonesia',
    'percakapan-arogansi-tni-di-indonesia',
    'Kata kunci tni dan TNI AD populer di Twitter dalam memperbincangkan sikap dan peran TNI di ruang-ruang sipil.',
    '<p>Kata kunci tni dan TNI AD populer di Twitter dalam memperbincangkan sikap dan peran TNI di ruang-ruang sipil yang sarat dengan kekerasan dan penindasan.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/02/Percakapan-TNI.png',
    'Media Sosial',
    true,
    '2022-02-05'
  ),
  (
    'Pro-Kontra #DukungPermendikbud30 dan #CabutPermendikbudristekno30',
    'pro-kontra-permendikbud30',
    'Tulisan ini ingin melihat dinamika pro-kontra Permendikbudristek Nomor 30 Tahun 2021 di platform Twitter.',
    '<p>Tulisan ini ingin melihat dinamika pro-kontra Permendikbudristek Nomor 30 Tahun 2021 di platform Twitter.</p>',
    'https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2021/12/Permendikbud30.jpg',
    'Kebijakan',
    true,
    '2021-12-15'
  );
