'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PublikasiForm({ publikasiId = null }) {
  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    ringkasan: '',
    konten: '',
    gambar_url: '',
    penulis: '',
    status: 'draft',
    tanggal: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (publikasiId) {
      loadPublikasi();
    }
  }, [publikasiId]);

  const loadPublikasi = async () => {
    try {
      const { data, error } = await supabase
        .from('publikasi')
        .select('*')
        .eq('id', publikasiId)
        .single();

      if (error) throw error;
      
      setFormData({
        ...data,
        tanggal: data.tanggal || new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      console.error('Error loading publikasi:', error);
      alert('Gagal memuat publikasi: ' + error.message);
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

    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar!');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `publikasi/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, gambar_url: publicUrl });
      alert('Gambar berhasil diupload!');
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Gagal upload gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.konten) {
      alert('Judul dan konten harus diisi!');
      return;
    }

    try {
      setLoading(true);

      if (publikasiId) {
        // Update
        const { error } = await supabase
          .from('publikasi')
          .update(formData)
          .eq('id', publikasiId);

        if (error) throw error;
        alert('Publikasi berhasil diupdate!');
      } else {
        // Create
        const { error } = await supabase
          .from('publikasi')
          .insert([formData]);

        if (error) throw error;
        alert('Publikasi berhasil dibuat!');
      }

      router.push('/admin/publications');
      router.refresh();
    } catch (error) {
      console.error('Error saving publikasi:', error);
      alert('Gagal menyimpan publikasi: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      {/* Judul */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Judul Publikasi *
        </label>
        <input
          type="text"
          value={formData.judul}
          onChange={(e) => handleJudulChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Masukkan judul publikasi..."
          required
        />
      </div>

      {/* Slug */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug (URL)
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="publikasi-slug"
        />
        <p className="mt-1 text-sm text-gray-500">
          URL: /publikasi/{formData.slug || 'publikasi-slug'}
        </p>
      </div>

      {/* Ringkasan */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ringkasan
        </label>
        <textarea
          value={formData.ringkasan}
          onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          placeholder="Ringkasan singkat publikasi..."
        />
      </div>

      {/* Konten */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Konten *
        </label>
        <textarea
          value={formData.konten}
          onChange={(e) => setFormData({ ...formData, konten: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          rows="20"
          placeholder="Tulis konten publikasi di sini (Markdown/HTML)..."
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Tip: Anda bisa gunakan Markdown atau HTML
        </p>
      </div>

      {/* Gambar */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Gambar Cover
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>
        {formData.gambar_url && (
          <div className="mt-4">
            <img
              src={formData.gambar_url}
              alt="Preview"
              className="w-full max-w-md rounded-lg shadow-md"
            />
          </div>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

        <div>
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
      </div>

      {/* Status */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="draft"
              checked={formData.status === 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mr-2"
            />
            Draft
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="published"
              checked={formData.status === 'published'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mr-2"
            />
            Published
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
        >
          {loading ? 'Menyimpan...' : publikasiId ? 'Update Publikasi' : 'Buat Publikasi'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/publications')}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
