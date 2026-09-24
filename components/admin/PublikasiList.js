'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PublikasiList() {
  const [publikasi, setPublikasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('semua');
  const router = useRouter();

  useEffect(() => {
    loadPublikasi();
  }, [filter]);

  const loadPublikasi = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('publikasi')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter === 'published') {
        query = query.eq('status', 'published');
      } else if (filter === 'draft') {
        query = query.eq('status', 'draft');
      }

      const { data, error } = await query;

      if (error) throw error;
      setPublikasi(data || []);
    } catch (error) {
      console.error('Error loading publikasi:', error);
      alert('Gagal memuat publikasi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus publikasi ini?')) return;

    try {
      const { error } = await supabase
        .from('publikasi')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Publikasi berhasil dihapus!');
      loadPublikasi();
    } catch (error) {
      console.error('Error deleting publikasi:', error);
      alert('Gagal menghapus publikasi: ' + error.message);
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    try {
      const { error } = await supabase
        .from('publikasi')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      alert(`Publikasi berhasil di${newStatus === 'published' ? 'publikasikan' : 'draft'}!`);
      loadPublikasi();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Gagal mengubah status: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Memuat publikasi...</p>
      </div>
    );
  }

  return (
    <div>
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
            Semua ({publikasi.length})
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
          onClick={() => router.push('/admin/publications/new')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Buat Publikasi Baru
        </button>
      </div>

      {publikasi.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Belum ada publikasi.</p>
          <button
            onClick={() => router.push('/admin/publications/new')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Buat Publikasi Pertama
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
                  Penulis
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
              {publikasi.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{item.judul}</div>
                    <div className="text-sm text-gray-500">{item.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {item.penulis}
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
                      onClick={() => router.push(`/admin/publications/edit/${item.id}`)}
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
