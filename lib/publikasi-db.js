import { supabase } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * Get all published publikasi from database
 */
export async function getAllPublikasiFromDB() {
  const { data, error } = await supabase
    .from('publikasi')
    .select('*')
    .eq('status', 'published')
    .order('tanggal', { ascending: false });

  if (error) {
    console.error('Error fetching publikasi:', error);
    return [];
  }

  return data || [];
}

/**
 * Get single publikasi by slug from database
 */
export async function getPublikasiBySlug(slug) {
  const { data, error } = await supabase
    .from('publikasi')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching publikasi:', error);
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
