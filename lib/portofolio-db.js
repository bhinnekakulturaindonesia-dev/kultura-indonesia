import { supabase } from './supabase';
import { remark } from 'remark';
import html from 'remark-html';

/**
 * Get all published portofolio from database
 */
export async function getAllPortofolioFromDB() {
  const { data, error } = await supabase
    .from('portofolio')
    .select('*')
    .eq('status', 'published')
    .order('urutan', { ascending: true });

  if (error) {
    console.error('Error fetching portofolio:', error);
    return [];
  }

  return data || [];
}

/**
 * Get single portofolio by slug from database
 */
export async function getPortofolioBySlug(slug) {
  const { data, error } = await supabase
    .from('portofolio')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching portofolio:', error);
    return null;
  }

  // Convert markdown content to HTML
  if (data && data.deskripsi) {
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(data.deskripsi);
    data.contentHtml = processedContent.toString();
  }

  return data;
}
