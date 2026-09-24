'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function ArtikelManagement() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadArtikel();
  }, [filter]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const loadArtikel = async () => {
    try {
      let query = supabase
        .from('artikel')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setArtikel(data || []);
    } catch (error) {
      console.error('Error loading artikel:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, judul) => {
    if (!confirm(`Yakin ingin menghapus artikel "${judul}"?`)) return;

    try {
      const { error } = await supabase
        .from('artikel')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      alert('Artikel berhasil dihapus!');
      loadArtikel();
    } catch (error) {
      console.error('Error deleting artikel:', error);
      alert('Gagal menghapus artikel: ' + error.message);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    try {
      const { error } = await supabase
        .from('artikel')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      loadArtikel();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading artikel...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Artikel</h1>
          <p className="text-gray-600 mt-2">Buat, edit, dan hapus artikel</p>
        </div>
        <a
          href="/admin/artikel/new"
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          ➕ Buat Artikel Baru
        </a>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Semua ({artikel.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'published'
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'draft'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Draft
          </button>
        </div>
      </div>

      {/* Artikel List */}
      {artikel.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">Belum ada artikel</p>
          <a
            href="/admin/artikel/new"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            Buat artikel pertama →
          </a>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {artikel.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.judul}</div>
                    <div className="text-sm text-gray-500">/{item.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.kategori || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(item.id, item.status)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}
                    >
                      {item.status === 'published' ? '✅ Published' : '📋 Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.tanggal).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <a
                      href={`/publikasi/${item.slug}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-900"
                    >
                      👁️ Lihat
                    </a>
                    <a
                      href={`/admin/artikel/edit/${item.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      ✏️ Edit
                    </a>
                    <button
                      onClick={() => handleDelete(item.id, item.judul)}
                      className="text-red-600 hover:text-red-900"
                    >
                      🗑️ Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
