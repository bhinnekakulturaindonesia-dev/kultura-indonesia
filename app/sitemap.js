import { getAllPublikasiFromDB } from '@/lib/publikasi-db';
import { getAllKegiatanFromDB } from '@/lib/kegiatan-db';
import { getAllPortofolioFromDB } from '@/lib/portofolio-db';

export default async function sitemap() {
  const baseUrl = 'https://studikulturaindonesia.vercel.app';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/publikasi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kegiatan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portofolio`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wbtb`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic pages - Publikasi
  const publikasi = await getAllPublikasiFromDB();
  const publikasiPages = publikasi.map((item) => ({
    url: `${baseUrl}/publikasi/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic pages - Kegiatan
  const kegiatan = await getAllKegiatanFromDB();
  const kegiatanPages = kegiatan.map((item) => ({
    url: `${baseUrl}/kegiatan/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic pages - Portofolio
  const portofolio = await getAllPortofolioFromDB();
  const portofolioPages = portofolio.map((item) => ({
    url: `${baseUrl}/portofolio/${item.slug}`,
    lastModified: new Date(item.updated_at || item.created_at),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...publikasiPages, ...kegiatanPages, ...portofolioPages];
}
