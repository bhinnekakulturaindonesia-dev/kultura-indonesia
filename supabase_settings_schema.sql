-- ============================================
-- SITE SETTINGS TABLE
-- Flexible key-value storage for site content
-- ============================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text', -- text, json, number, boolean
  category TEXT DEFAULT 'general', -- general, tentang-kami, footer, social-media
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_settings_key ON site_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON site_settings(category);

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read settings (public site content)
CREATE POLICY "Enable read access for all users" ON site_settings
  FOR SELECT USING (true);

-- Policy: Only authenticated users can update settings (admin only)
CREATE POLICY "Enable update for authenticated users only" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- INSERT DEFAULT CONTENT
-- ============================================

-- Tentang Kami - Hero Section
INSERT INTO site_settings (setting_key, setting_value, setting_type, category, description) VALUES
('tentang_hero_title', 'Halo, Kami Studi Kultura Indonesia', 'text', 'tentang-kami', 'Hero title on Tentang Kami page'),
('tentang_hero_subtitle', 'Sekelompok peneliti muda yang berkomitmen untuk menghasilkan pengetahuan yang mempromosikan demokrasi dan keragaman di Indonesia, dengan minat khusus dalam metodologi penelitian digital.', 'text', 'tentang-kami', 'Hero subtitle/description'),

-- Tentang Kami - Fokus Riset
('fokus_riset_title', 'Fokus Riset', 'text', 'tentang-kami', 'Fokus Riset section title'),
('fokus_studi_budaya_title', 'Studi Budaya', 'text', 'tentang-kami', 'Studi Budaya card title'),
('fokus_studi_budaya_desc', 'Analisis kritis dan berbasis data terhadap dinamika sosial digital dan budaya kontemporer.', 'text', 'tentang-kami', 'Studi Budaya description'),
('fokus_toleransi_title', 'Toleransi & Keragaman', 'text', 'tentang-kami', 'Toleransi card title'),
('fokus_toleransi_desc', 'Mengkaji wacana toleransi, pluralisme, dan isu keragaman dalam percakapan publik Indonesia.', 'text', 'tentang-kami', 'Toleransi description'),
('fokus_metodologi_title', 'Metodologi Digital', 'text', 'tentang-kami', 'Metodologi card title'),
('fokus_metodologi_desc', 'Pengembangan dan penerapan metode penelitian digital untuk analisis media sosial dan budaya online.', 'text', 'tentang-kami', 'Metodologi description'),

-- Tentang Kami - Siapa Kami Section
('siapa_kami_title', 'Siapa Kami', 'text', 'tentang-kami', 'Siapa Kami section title'),
('siapa_kami_desc', 'Studi Kultura Indonesia adalah inisiatif riset independen yang mengkaji budaya, toleransi, dan dinamika media sosial di Indonesia melalui pendekatan kritis dan berbasis data.', 'text', 'tentang-kami', 'Siapa Kami description'),

-- Footer Content
('footer_title', 'Kultura Indonesia', 'text', 'footer', 'Footer title'),
('footer_description', 'Studi budaya, toleransi, dan analisis percakapan publik di Indonesia melalui perspektif kritis dan berbasis data.', 'text', 'footer', 'Footer description text'),
('footer_newsletter_text', 'Dapatkan update publikasi dan kegiatan terbaru kami melalui email.', 'text', 'footer', 'Newsletter subscription text'),
('footer_copyright', '© 2026 Kultura Indonesia. Semua hak dilindungi.', 'text', 'footer', 'Copyright text'),

-- Contact & Social Media
('contact_email', 'riset@kulturaindonesia.or.id', 'text', 'footer', 'Contact email address'),
('social_instagram', 'https://instagram.com/kulturaindonesia', 'text', 'social-media', 'Instagram profile URL'),
('social_twitter', 'https://twitter.com/kulturaindonesia', 'text', 'social-media', 'Twitter/X profile URL'),
('social_youtube', 'https://youtube.com/@kulturaindonesia', 'text', 'social-media', 'YouTube channel URL'),
('social_facebook', '', 'text', 'social-media', 'Facebook page URL (optional)'),
('social_linkedin', '', 'text', 'social-media', 'LinkedIn page URL (optional)')

ON CONFLICT (setting_key) DO NOTHING;

-- ============================================
-- MEDIA TABLE - CREATE IF NOT EXISTS
-- ============================================

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  mime_type TEXT,
  width INTEGER,
  height INTEGER,
  category TEXT DEFAULT 'general', -- general, team, gallery, blog, portfolio
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_media_category ON media(category);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);

-- Enable Row Level Security
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read media (public files)
CREATE POLICY "Enable read access for all users" ON media
  FOR SELECT USING (true);

-- Policy: Only authenticated users can upload media
CREATE POLICY "Enable insert for authenticated users only" ON media
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update media
CREATE POLICY "Enable update for authenticated users only" ON media
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete media
CREATE POLICY "Enable delete for authenticated users only" ON media
  FOR DELETE USING (auth.role() = 'authenticated');

COMMENT ON COLUMN media.category IS 'Category: general, team, gallery, blog, portfolio';

-- ============================================
-- FUNCTION: Auto-update updated_at timestamp
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for site_settings
DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON site_settings
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger for media
DROP TRIGGER IF EXISTS update_media_updated_at ON media;
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON media
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

