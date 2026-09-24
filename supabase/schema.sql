-- ============================================================
-- KULTURA INDONESIA — Supabase Schema
-- Jalankan SQL ini di: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- TABEL ARTIKEL
CREATE TABLE IF NOT EXISTS artikel (
  id          BIGSERIAL PRIMARY KEY,
  slug        TEXT UNIQUE NOT NULL,
  judul       TEXT NOT NULL,
  ringkasan   TEXT,
  konten      TEXT,
  gambar_url  TEXT,
  kategori    TEXT,
  penulis     TEXT,
  status      TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  tanggal     DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- TABEL PORTOFOLIO
CREATE TABLE IF NOT EXISTS portofolio (
  id          BIGSERIAL PRIMARY KEY,
  judul       TEXT NOT NULL,
  deskripsi   TEXT,
  gambar_url  TEXT,
  kategori    TEXT,
  link        TEXT,
  urutan      INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- TABEL KEGIATAN
CREATE TABLE IF NOT EXISTS kegiatan (
  id          BIGSERIAL PRIMARY KEY,
  judul       TEXT NOT NULL,
  deskripsi   TEXT,
  gambar_url  TEXT,
  tanggal     DATE,
  lokasi      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY
ALTER TABLE artikel    ENABLE ROW LEVEL SECURITY;
ALTER TABLE portofolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan   ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published artikel"
  ON artikel FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read portofolio"
  ON portofolio FOR SELECT USING (true);

CREATE POLICY "Public can read kegiatan"
  ON kegiatan FOR SELECT USING (true);

-- POLICIES UNTUK ADMIN (authenticated users dapat create/update/delete)
CREATE POLICY "Authenticated users can insert artikel"
  ON artikel FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artikel"
  ON artikel FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete artikel"
  ON artikel FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert portofolio"
  ON portofolio FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update portofolio"
  ON portofolio FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete portofolio"
  ON portofolio FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert kegiatan"
  ON kegiatan FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update kegiatan"
  ON kegiatan FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete kegiatan"
  ON kegiatan FOR DELETE
  TO authenticated
  USING (true);

-- STORAGE BUCKET UNTUK GAMBAR
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- STORAGE POLICIES
CREATE POLICY "Public can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'images');

-- SAMPLE DATA
INSERT INTO artikel (slug, judul, ringkasan, gambar_url, kategori, status, tanggal) VALUES
  ('proyek-ideologis-animasi-nussa','Proyek Ideologis Animasi Nussa','Tulisan ini membahas animasi Nussa sebagai tayangan keluarga Islami yang berupaya menampilkan nilai-nilai toleransi.','https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-09-at-13.16.37.jpeg','Media & Agama','published','2022-06-09'),
  ('horseback-archery-komodifikasi','Horseback Archery dan Komodifikasi berbasis Agama','Fenomena komodifikasi berbasis agama berbentuk olahraga berkuda-memanah yang dimobilisasi melalui media sosial.','https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/05/Untitled-design.png','Olahraga & Agama','published','2022-05-01'),
  ('tren-percakapan-halal-2021','Tren Percakapan Halal Versi Warganet Sepanjang 2021','Percakapan warganet di Twitter mengenai label halal pada makanan, kosmetik, dan produk lain.','https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2022/02/Semangat-Halal-00.jpg','Media Sosial','published','2022-02-01');
