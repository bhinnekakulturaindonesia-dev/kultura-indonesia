import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all'; // all, artikel, publikasi, kegiatan

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ 
      results: [],
      message: 'Query minimal 2 karakter'
    });
  }

  try {
    const results = [];
    const searchQuery = `%${query}%`;

    // Search Publikasi
    if (type === 'all' || type === 'publikasi') {
      const { data: publikasi } = await supabase
        .from('publikasi')
        .select('id, judul, slug, ringkasan, gambar_url, tanggal, penulis')
        .eq('status', 'published')
        .or(`judul.ilike.${searchQuery},ringkasan.ilike.${searchQuery},konten.ilike.${searchQuery}`)
        .limit(10);

      if (publikasi) {
        results.push(...publikasi.map(item => ({
          ...item,
          type: 'publikasi',
          url: `/publikasi/${item.slug}`
        })));
      }
    }

    // Search Kegiatan
    if (type === 'all' || type === 'kegiatan') {
      const { data: kegiatan } = await supabase
        .from('kegiatan')
        .select('id, judul, slug, ringkasan, gambar_url, tanggal, lokasi, kategori')
        .eq('status', 'published')
        .or(`judul.ilike.${searchQuery},ringkasan.ilike.${searchQuery},konten.ilike.${searchQuery}`)
        .limit(10);

      if (kegiatan) {
        results.push(...kegiatan.map(item => ({
          ...item,
          type: 'kegiatan',
          url: `/kegiatan/${item.slug}`
        })));
      }
    }

    // Search Artikel (if needed)
    if (type === 'all' || type === 'artikel') {
      const { data: artikel } = await supabase
        .from('artikel')
        .select('id, judul, slug, ringkasan, gambar_url, tanggal, penulis')
        .eq('status', 'published')
        .or(`judul.ilike.${searchQuery},ringkasan.ilike.${searchQuery},konten.ilike.${searchQuery}`)
        .limit(10);

      if (artikel) {
        results.push(...artikel.map(item => ({
          ...item,
          type: 'artikel',
          url: `/artikel/${item.slug}`
        })));
      }
    }

    // Sort by date (newest first)
    results.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

    return NextResponse.json({
      results,
      total: results.length,
      query
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat pencarian' },
      { status: 500 }
    );
  }
}
