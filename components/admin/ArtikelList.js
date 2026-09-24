'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ArtikelList() {
  const [artikel, setArtikel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua'); // semua, published, draft
  const router = useRouter();

  useEffect(() => {
    loadArtikel();
  }, [filter]);

  const loadArtikel = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('artikel')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'published') {
        query = query.eq('status', 'published');
      } else if (filter === 'draft') {
        query = query.eq('status', 'draft');
      }

      const { data, error } = await query;

      if (error) throw error;
      setArtikel(data || []);
    } catch (error) {
      console.error('Error loading artikel:', error);
      alert('Gagal memuat artikel: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;

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

  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    try {
      const { error } = await supabase
        .from('artikel')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      alert(`Artikel berhasil di${newStatus === 'published' ? 'publikasikan' : 'draft'}!`);
      loadArtikel();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Memuat artikel...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header & Filter */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('semua')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'semua'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua ({artikel.length})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'published'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'draft'
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Draft
          </button>
        </div>

        <button
          onClick={() => router.push('/admin/artikel/new')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Buat Artikel Baru
        </button>
      </div>

      {/* Artikel List */}
      {artikel.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada artikel.</p>
          <button
            onClick={() => router.push('/admin/artikel/new')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Buat Artikel Pertama
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
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
            <tbody className="bg-white divide-y divide-gray-200">
              {artikel.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                    <div className="text-sm text-gray-500">{item.penulis}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.kategori || 'Umum'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(item.tanggal || item.created_at).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => router.push(`/admin/artikel/edit/${item.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePublishToggle(item.id, item.status)}
                      className="text-green-600 hover:text-green-900"
                    >
                      {item.status === 'published' ? 'Draft' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
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
