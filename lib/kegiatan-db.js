import { supabase } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * Get all published kegiatan from database
 */
export async function getAllKegiatanFromDB() {
  const { data, error } = await supabase
    .from('kegiatan')
    .select('*')
    .eq('status', 'published')
    .order('tanggal', { ascending: false });

  if (error) {
    console.error('Error fetching kegiatan:', error);
    return [];
  }

  return data || [];
}

/**
 * Get single kegiatan by slug from database
 */
export async function getKegiatanBySlug(slug) {
  const { data, error } = await supabase
    .from('kegiatan')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching kegiatan:', error);
    return null;
  }

  // Convert markdown content to HTML
  if (data && data.konten) {
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(data.konten);
    data.contentHtml = processedContent.toString();
  }

  return data;
}
