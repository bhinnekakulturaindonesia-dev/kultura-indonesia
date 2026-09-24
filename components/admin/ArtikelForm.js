'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

// Import React Quill dynamically untuk avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export default function ArtikelForm({ artikelId = null }) {
  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    ringkasan: '',
    konten: '',
    gambar_url: '',
    kategori: '',
    penulis: '',
    status: 'draft',
    tanggal: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (artikelId) {
      loadArtikel();
    }
  }, [artikelId]);

  const loadArtikel = async () => {
    try {
      const { data, error } = await supabase
        .from('artikel')
        .select('*')
        .eq('id', artikelId)
        .single();

      if (error) throw error;
      
      setFormData({
        ...data,
        tanggal: data.tanggal || new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error loading artikel:', error);
      alert('Gagal memuat artikel: ' + error.message);
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleJudulChange = (value) => {
    setFormData({
      ...formData,
      judul: value,
      slug: generateSlug(value),
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validasi file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar!');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB!');
      return;
    }

    setUploading(true);

    try {
      // Upload ke Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${generateSlug(formData.judul || 'artikel')}.${fileExt}`;
      const filePath = `artikel/${fileName}`;

      const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, gambar_url: publicUrl });
      alert('Gambar berhasil diupload!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal upload gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validasi
      if (!formData.judul || !formData.slug) {
        alert('Judul dan slug harus diisi!');
        return;
      }

      if (artikelId) {
        // Update existing artikel
        const { error } = await supabase
          .from('artikel')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', artikelId);

        if (error) throw error;
        alert('Artikel berhasil diupdate!');
      } else {
        // Create new artikel
        const { error } = await supabase
          .from('artikel')
          .insert([formData]);

        if (error) throw error;
        alert('Artikel berhasil dibuat!');
      }

      router.push('/admin/artikel');
      router.refresh();
    } catch (error) {
      console.error('Error saving artikel:', error);
      alert('Gagal menyimpan artikel: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Artikel *
            </label>
            <input
              type="text"
              value={formData.judul}
              onChange={(e) => handleJudulChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan judul artikel..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="slug-artikel"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              URL: {`${window.location.origin}/publikasi/${formData.slug || 'slug-artikel'}`}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ringkasan
            </label>
            <textarea
              value={formData.ringkasan}
              onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="Ringkasan singkat artikel..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Artikel
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={formData.konten}
                onChange={(value) => setFormData({ ...formData, konten: value })}
                modules={quillModules}
                className="bg-white"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Publikasi</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={formData.tanggal}
                onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Menyimpan...' : (artikelId ? 'Update Artikel' : 'Publikasikan')}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Gambar Cover</h3>
            
            {formData.gambar_url && (
              <div className="mb-4">
                <img
                  src={formData.gambar_url}
                  alt="Preview"
                  className="w-full rounded-lg"
                />
              </div>
            )}

            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className={`block w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {uploading ? '⏳ Uploading...' : '📤 Upload Gambar'}
              </label>
              <p className="text-xs text-gray-500 mt-2">Max 2MB, format: JPG, PNG, GIF</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Atau URL Gambar
              </label>
              <input
                type="url"
                value={formData.gambar_url}
                onChange={(e) => setFormData({ ...formData, gambar_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-4">Info Tambahan</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <input
                type="text"
                value={formData.kategori}
                onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Media & Agama"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penulis
              </label>
              <input
                type="text"
                value={formData.penulis}
                onChange={(e) => setFormData({ ...formData, penulis: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nama penulis"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
