'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function PortofolioForm({ portofolioId = null }) {
  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    deskripsi: '',
    gambar_url: '',
    file_url: '',
    status: 'draft',
    urutan: 0,
  });
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (portofolioId) {
      loadPortofolio();
    }
  }, [portofolioId]);

  const loadPortofolio = async () => {
    try {
      const { data, error } = await supabase
        .from('portofolio')
        .select('*')
        .eq('id', portofolioId)
        .single();

      if (error) throw error;
      
      setFormData(data);
    } catch (error) {
      console.error('Error loading portofolio:', error);
      alert('Gagal memuat portofolio: ' + error.message);
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
      setUploadingImage(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `portofolio/${fileName}`;

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
      console.error('Error uploading image:', error);
      alert('Gagal upload gambar: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('File harus berupa PDF!');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Ukuran file maksimal 10MB!');
      return;
    }

    try {
      setUploadingFile(true);
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
      const filePath = `portofolio/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      setFormData({ ...formData, file_url: publicUrl });
      alert('PDF berhasil diupload!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Gagal upload PDF: ' + error.message);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.deskripsi) {
      alert('Judul dan deskripsi harus diisi!');
      return;
    }

    try {
      setLoading(true);

      if (portofolioId) {
        // Update
        const { error } = await supabase
          .from('portofolio')
          .update(formData)
          .eq('id', portofolioId);

        if (error) throw error;
        alert('Portofolio berhasil diupdate!');
      } else {
        // Create
        const { error } = await supabase
          .from('portofolio')
          .insert([formData]);

        if (error) throw error;
        alert('Portofolio berhasil dibuat!');
      }

      router.push('/admin/portfolio');
      router.refresh();
    } catch (error) {
      console.error('Error saving portofolio:', error);
      alert('Gagal menyimpan portofolio: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
      {/* Judul */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Judul Portofolio *
        </label>
        <input
          type="text"
          value={formData.judul}
          onChange={(e) => handleJudulChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Masukkan judul portofolio..."
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
          placeholder="portofolio-slug"
        />
        <p className="mt-1 text-sm text-gray-500">
          URL: /portofolio/{formData.slug || 'portofolio-slug'}
        </p>
      </div>

      {/* Deskripsi */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi *
        </label>
        <textarea
          value={formData.deskripsi}
          onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="5"
          placeholder="Deskripsi portofolio..."
          required
        />
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
            disabled={uploadingImage}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadingImage && <span className="text-sm text-gray-500">Uploading...</span>}
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

      {/* File PDF */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          File PDF (Optional)
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileUpload}
            disabled={uploadingFile}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
          />
          {uploadingFile && <span className="text-sm text-gray-500">Uploading...</span>}
        </div>
        {formData.file_url && (
          <div className="mt-2">
            <a 
              href={formData.file_url} 
              target="_blank" 
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              📄 Lihat PDF yang diupload
            </a>
          </div>
        )}
      </div>

      {/* Urutan & Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urutan
          </label>
          <input
            type="number"
            value={formData.urutan}
            onChange={(e) => setFormData({ ...formData, urutan: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          <p className="mt-1 text-sm text-gray-500">
            Nomor urutan tampilan (semakin kecil semakin atas)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <div className="flex gap-4 mt-2">
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
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:bg-gray-400"
        >
          {loading ? 'Menyimpan...' : portofolioId ? 'Update Portofolio' : 'Buat Portofolio'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/portfolio')}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
