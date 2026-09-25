'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, publikasi, kegiatan
  const [sortBy, setSortBy] = useState('views'); // views, recent

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch from page_stats view
      const { data, error } = await supabase
        .from('page_stats')
        .select('*')
        .order('total_views', { ascending: false });

      if (error) throw error;

      setStats(data || []);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      alert('Gagal memuat analytics: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStats = stats
    .filter(item => filter === 'all' || item.page_type === filter)
    .sort((a, b) => {
      if (sortBy === 'views') {
        return b.total_views - a.total_views;
      } else {
        return new Date(b.last_view) - new Date(a.last_view);
      }
    });

  const totalViews = stats.reduce((sum, item) => sum + item.total_views, 0);
  const publikasiViews = stats.filter(s => s.page_type === 'publikasi').reduce((sum, item) => sum + item.total_views, 0);
  const kegiatanViews = stats.filter(s => s.page_type === 'kegiatan').reduce((sum, item) => sum + item.total_views, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPageUrl = (type, slug) => {
    const urls = {
      publikasi: `/publikasi/${slug}`,
      kegiatan: `/kegiatan/${slug}`,
      artikel: `/artikel/${slug}`,
      portofolio: `/portofolio/${slug}`
    };
    return urls[type] || '#';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Memuat analytics...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Statistik page views untuk semua konten</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Total Views</div>
          <div className="text-3xl font-bold text-gray-900">
            {totalViews.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {stats.length} halaman tracked
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Publikasi Views</div>
          <div className="text-3xl font-bold text-blue-600">
            {publikasiViews.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {stats.filter(s => s.page_type === 'publikasi').length} publikasi
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Kegiatan Views</div>
          <div className="text-3xl font-bold text-green-600">
            {kegiatanViews.toLocaleString('id-ID')}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            {stats.filter(s => s.page_type === 'kegiatan').length} kegiatan
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Type Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('publikasi')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'publikasi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Publikasi
            </button>
            <button
              onClick={() => setFilter('kegiatan')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'kegiatan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Kegiatan
            </button>
          </div>

          {/* Sort */}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={() => setSortBy('views')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                sortBy === 'views'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Most Views
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                sortBy === 'recent'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🕐 Recent
            </button>
          </div>
        </div>
      </div>

      {/* Stats Table */}
      {filteredStats.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Belum ada data analytics
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Views
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days Tracked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last View
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStats.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 max-w-md truncate">
                      {item.page_slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.page_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                    {item.total_views.toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                    {item.days_tracked} hari
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(item.last_view)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={getPageUrl(item.page_type, item.page_slug)}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Lihat →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
