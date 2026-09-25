'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    artikel: { total: 0, published: 0, draft: 0 },
    publikasi: { total: 0, published: 0, draft: 0 },
    portofolio: { total: 0, published: 0, draft: 0 },
    kegiatan: { total: 0, published: 0, draft: 0 },
    newsletter: { total: 0, active: 0 },
    comments: { total: 0, pending: 0, approved: 0 },
    pageViews: { total: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();
    loadStats();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      router.push('/admin/login');
      return;
    }
    
    setUser(session.user);
  };

  const loadStats = async () => {
    try {
      // Get artikel stats
      const { data: artikelData } = await supabase.from('artikel').select('status');
      const artikel = {
        total: artikelData?.length || 0,
        published: artikelData?.filter(a => a.status === 'published').length || 0,
        draft: artikelData?.filter(a => a.status === 'draft').length || 0
      };

      // Get publikasi stats
      const { data: publikasiData } = await supabase.from('publikasi').select('status');
      const publikasi = {
        total: publikasiData?.length || 0,
        published: publikasiData?.filter(p => p.status === 'published').length || 0,
        draft: publikasiData?.filter(p => p.status === 'draft').length || 0
      };

      // Get portofolio stats
      const { data: portofolioData } = await supabase.from('portofolio').select('status');
      const portofolio = {
        total: portofolioData?.length || 0,
        published: portofolioData?.filter(p => p.status === 'published').length || 0,
        draft: portofolioData?.filter(p => p.status === 'draft').length || 0
      };

      // Get kegiatan stats
      const { data: kegiatanData } = await supabase.from('kegiatan').select('status');
      const kegiatan = {
        total: kegiatanData?.length || 0,
        published: kegiatanData?.filter(k => k.status === 'published').length || 0,
        draft: kegiatanData?.filter(k => k.status === 'draft').length || 0
      };

      // Get newsletter stats
      const { data: newsletterData } = await supabase.from('newsletter_subscribers').select('status');
      const newsletter = {
        total: newsletterData?.length || 0,
        active: newsletterData?.filter(n => n.status === 'active').length || 0
      };

      // Get comments stats
      const { data: commentsData } = await supabase.from('comments').select('status');
      const comments = {
        total: commentsData?.length || 0,
        pending: commentsData?.filter(c => c.status === 'pending').length || 0,
        approved: commentsData?.filter(c => c.status === 'approved').length || 0
      };

      // Get page views stats
      const { data: pageViewsData } = await supabase.from('page_views').select('id', { count: 'exact', head: true });
      const pageViews = {
        total: pageViewsData?.length || 0
      };

      setStats({
        artikel,
        publikasi,
        portofolio,
        kegiatan,
        newsletter,
        comments,
        pageViews
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview statistik konten dan aktivitas website</p>
        </div>

        {/* Content Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">📊 Content Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/articles" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📝</span>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                Artikel
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.artikel.total}</div>
            <div className="flex gap-3 text-sm text-gray-600">
              <span className="text-green-600">✓ {stats.artikel.published}</span>
              <span className="text-yellow-600">◐ {stats.artikel.draft}</span>
            </div>
          </Link>

          <Link href="/admin/publications" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📚</span>
              <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                Publikasi
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.publikasi.total}</div>
            <div className="flex gap-3 text-sm text-gray-600">
              <span className="text-green-600">✓ {stats.publikasi.published}</span>
              <span className="text-yellow-600">◐ {stats.publikasi.draft}</span>
            </div>
          </Link>

          <Link href="/admin/portfolio" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🎨</span>
              <span className="text-xs font-semibold px-2 py-1 bg-pink-100 text-pink-800 rounded-full">
                Portofolio
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.portofolio.total}</div>
            <div className="flex gap-3 text-sm text-gray-600">
              <span className="text-green-600">✓ {stats.portofolio.published}</span>
              <span className="text-yellow-600">◐ {stats.portofolio.draft}</span>
            </div>
          </Link>

          <Link href="/admin/activities" className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📅</span>
              <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-800 rounded-full">
                Kegiatan
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.kegiatan.total}</div>
            <div className="flex gap-3 text-sm text-gray-600">
              <span className="text-green-600">✓ {stats.kegiatan.published}</span>
              <span className="text-yellow-600">◐ {stats.kegiatan.draft}</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">💬 Engagement & Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/analytics" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow hover:shadow-lg transition-shadow p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">📊</span>
              <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded-full">
                Analytics
              </span>
            </div>
            <div className="text-sm opacity-90 mb-1">Total Page Views</div>
            <div className="text-3xl font-bold">{stats.pageViews.total.toLocaleString('id-ID')}</div>
          </Link>

          <Link href="/admin/comments" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow hover:shadow-lg transition-shadow p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">💬</span>
              <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded-full">
                Comments
              </span>
            </div>
            <div className="text-sm opacity-90 mb-1">Pending / Total</div>
            <div className="text-3xl font-bold">{stats.comments.pending} / {stats.comments.total}</div>
          </Link>

          <Link href="/admin/newsletter" className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow hover:shadow-lg transition-shadow p-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">📧</span>
              <span className="text-xs font-semibold px-2 py-1 bg-white/20 rounded-full">
                Newsletter
              </span>
            </div>
            <div className="text-sm opacity-90 mb-1">Active Subscribers</div>
            <div className="text-3xl font-bold">{stats.newsletter.active}</div>
          </Link>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}
