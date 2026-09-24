'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function KegiatanManagement() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    gambar_url: '',
    tanggal: new Date().toISOString().split('T')[0],
    lokasi: '',
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadKegiatan();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const loadKegiatan = async () => {
    try {
      const { data, error } = await supabase
        .from('kegiatan')
        .select('*')
        .order('tanggal', { ascending: false });

      if (error) throw error;
      setKegiatan(data || []);
    } catch (error) {
      console.error('Error loading kegiatan:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || '',
      gambar_url: item.gambar_url || '',
      tanggal: item.tanggal || new Date().toISOString().split('T')[0],
      lokasi: item.lokasi || '',
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      judul: '',
      deskripsi: '',
      gambar_url: '',
      tanggal: new Date().toISOString().split('T')[0],
      lokasi: '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        const { error } = await supabase
          .from('kegiatan')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        alert('Kegiatan berhasil diupdate!');
      } else {
        const { error } = await supabase
          .from('kegiatan')
          .insert([formData]);

        if (error) throw error;
        alert('Kegiatan berhasil ditambahkan!');
      }

      setShowModal(false);
      loadKegiatan();
    } catch (error) {
      console.error('Error saving kegiatan:', error);
      alert('Gagal menyimpan kegiatan: ' + error.message);
    }
  };

  const handleDelete = async (id, judul) => {
    if (!confirm(`Yakin ingin menghapus "${judul}"?`)) return;

    try {
      const { error } = await supabase
        .from('kegiatan')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Kegiatan berhasil dihapus!');
      loadKegiatan();
    } catch (error) {
      console.error('Error deleting kegiatan:', error);
      alert('Gagal menghapus kegiatan: ' + error.message);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Kegiatan</h1>
          <p className="text-gray-600 mt-2">Tambah dan edit kegiatan/event</p>
        </div>
        <button
          onClick={handleNew}
          className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium"
        >
          ➕ Tambah Kegiatan
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {kegiatan.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Belum ada kegiatan</p>
            <button
              onClick={handleNew}
              className="text-red-600 hover:underline"
            >
              Tambah kegiatan pertama →
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lokasi</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {kegiatan.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {item.gambar_url && (
                        <img
                          src={item.gambar_url}
                          alt={item.judul}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{item.judul}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{item.deskripsi}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.tanggal ? new Date(item.tanggal).toLocaleDateString('id-ID') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.lokasi || '-'}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      ✏️ Edit
                    </button>
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Kegiatan *
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  rows="4"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Jakarta, Indonesia"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="url"
                  value={formData.gambar_url}
                  onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                >
                  {editingItem ? 'Update' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
