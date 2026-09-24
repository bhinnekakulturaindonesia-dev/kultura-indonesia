'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalArtikel: 0,
    publishedArtikel: 0,
    draftArtikel: 0,
    totalPortofolio: 0,
    totalKegiatan: 0,
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
      const { data: allArtikel } = await supabase
        .from('artikel')
        .select('status');
      
      const totalArtikel = allArtikel?.length || 0;
      const publishedArtikel = allArtikel?.filter(a => a.status === 'published').length || 0;
      const draftArtikel = allArtikel?.filter(a => a.status === 'draft').length || 0;

      // Get portofolio count
      const { data: portofolio } = await supabase
        .from('portofolio')
        .select('id', { count: 'exact', head: true });
      
      // Get kegiatan count
      const { data: kegiatan } = await supabase
        .from('kegiatan')
        .select('id', { count: 'exact', head: true });

      setStats({
        totalArtikel,
        publishedArtikel,
        draftArtikel,
        totalPortofolio: portofolio?.length || 0,
        totalKegiatan: kegiatan?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Artikel',
      value: stats.totalArtikel,
      icon: '📝',
      color: 'bg-blue-500',
      link: '/admin/artikel'
    },
    {
      title: 'Artikel Published',
      value: stats.publishedArtikel,
      icon: '✅',
      color: 'bg-green-500',
      link: '/admin/artikel'
    },
    {
      title: 'Artikel Draft',
      value: stats.draftArtikel,
      icon: '📋',
      color: 'bg-yellow-500',
      link: '/admin/artikel'
    },
    {
      title: 'Total Portofolio',
      value: stats.totalPortofolio,
      icon: '🎨',
      color: 'bg-purple-500',
      link: '/admin/portofolio'
    },
    {
      title: 'Total Kegiatan',
      value: stats.totalKegiatan,
      icon: '📅',
      color: 'bg-red-500',
      link: '/admin/kegiatan'
    },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang kembali, {user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`${card.color} w-16 h-16 rounded-full flex items-center justify-center text-3xl`}>
                {card.icon}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/artikel/new"
              className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
            >
              ➕ Buat Artikel Baru
            </a>
            <a
              href="/admin/portofolio/new"
              className="block w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
            >
              ➕ Tambah Portofolio
            </a>
            <a
              href="/admin/kegiatan/new"
              className="block w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors text-center font-medium"
            >
              ➕ Tambah Kegiatan
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Info</h2>
          <div className="space-y-3 text-gray-600">
            <p>✨ Dashboard admin sudah siap digunakan</p>
            <p>🚀 Upload artikel, portofolio, dan kegiatan dengan mudah</p>
            <p>📸 Upload gambar langsung dari dashboard</p>
            <p>📝 Rich text editor untuk menulis artikel</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
