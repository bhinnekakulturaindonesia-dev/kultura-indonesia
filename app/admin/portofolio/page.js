'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function PortofolioManagement() {
  const [portofolio, setPortofolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    gambar_url: '',
    kategori: '',
    link: '',
    urutan: 0,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadPortofolio();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const loadPortofolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portofolio')
        .select('*')
        .order('urutan', { ascending: true });

      if (error) throw error;
      setPortofolio(data || []);
    } catch (error) {
      console.error('Error loading portofolio:', error);
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
      kategori: item.kategori || '',
      link: item.link || '',
      urutan: item.urutan || 0,
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingItem(null);
    setFormData({
      judul: '',
      deskripsi: '',
      gambar_url: '',
      kategori: '',
      link: '',
      urutan: 0,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // Update
        const { error } = await supabase
          .from('portofolio')
          .update(formData)
          .eq('id', editingItem.id);

        if (error) throw error;
        alert('Portofolio berhasil diupdate!');
      } else {
        // Create
        const { error } = await supabase
          .from('portofolio')
          .insert([formData]);

        if (error) throw error;
        alert('Portofolio berhasil ditambahkan!');
      }

      setShowModal(false);
      loadPortofolio();
    } catch (error) {
      console.error('Error saving portofolio:', error);
      alert('Gagal menyimpan portofolio: ' + error.message);
    }
  };

  const handleDelete = async (id, judul) => {
    if (!confirm(`Yakin ingin menghapus "${judul}"?`)) return;

    try {
      const { error } = await supabase
        .from('portofolio')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Portofolio berhasil dihapus!');
      loadPortofolio();
    } catch (error) {
      console.error('Error deleting portofolio:', error);
      alert('Gagal menghapus portofolio: ' + error.message);
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
          <h1 className="text-3xl font-bold text-gray-900">Kelola Portofolio</h1>
          <p className="text-gray-600 mt-2">Tambah dan edit item portofolio</p>
        </div>
        <button
          onClick={handleNew}
          className="bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          ➕ Tambah Portofolio
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portofolio.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {item.gambar_url && (
              <img
                src={item.gambar_url}
                alt={item.judul}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{item.judul}</h3>
              {item.kategori && (
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full mb-2">
                  {item.kategori}
                </span>
              )}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.deskripsi}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.judul)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 text-sm"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}

        {portofolio.length === 0 && (
          <div className="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">Belum ada portofolio</p>
            <button
              onClick={handleNew}
              className="text-purple-600 hover:underline"
            >
              Tambah portofolio pertama →
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingItem ? 'Edit Portofolio' : 'Tambah Portofolio Baru'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul *
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Gambar
                </label>
                <input
                  type="url"
                  value={formData.gambar_url}
                  onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <input
                  type="text"
                  value={formData.kategori}
                  onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link
                </label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urutan (untuk sorting)
                </label>
                <input
                  type="number"
                  value={formData.urutan}
                  onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
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
