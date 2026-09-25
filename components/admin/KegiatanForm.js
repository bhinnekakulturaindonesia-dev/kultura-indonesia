'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function KegiatanForm({ kegiatanId = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const isEdit = !!kegiatanId;

  const [formData, setFormData] = useState({
    judul: '',
    slug: '',
    ringkasan: '',
    konten: '',
    gambar_url: '',
    tanggal: '',
    lokasi: '',
    kategori: 'Pelatihan',
    status: 'draft'
  });

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchKegiatan();
    }
  }, [kegiatanId]);

  const fetchKegiatan = async () => {
    try {
      const { data, error } = await supabase
        .from('kegiatan')
        .select('*')
        .eq('id', kegiatanId)
        .single();

      if (error) throw error;

      if (data) {
        setFormData(data);
        setImagePreview(data.gambar_url || '');
      }
    } catch (error) {
      console.error('Error fetching kegiatan:', error);
      alert('Gagal memuat data kegiatan');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate slug from judul
    if (name === 'judul' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file maksimal 2MB');
      return;
    }

    try {
      setUploading(true);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `kegiatan/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        gambar_url: publicUrl
      }));
      setImagePreview(publicUrl);

      alert('Gambar berhasil diupload');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.judul.trim()) {
      alert('Judul harus diisi');
      return;
    }
    if (!formData.slug.trim()) {
      alert('Slug harus diisi');
      return;
    }
    if (!formData.tanggal) {
      alert('Tanggal harus diisi');
      return;
    }

    try {
      setLoading(true);

      const dataToSave = {
        ...formData,
        updated_at: new Date().toISOString()
      };

      if (isEdit) {
        // Update existing
        const { error } = await supabase
          .from('kegiatan')
          .update(dataToSave)
          .eq('id', kegiatanId);

        if (error) throw error;
        alert('Kegiatan berhasil diupdate');
      } else {
        // Create new
        delete dataToSave.id; // Remove id for insert
        dataToSave.created_at = new Date().toISOString();

        const { error } = await supabase
          .from('kegiatan')
          .insert([dataToSave]);

        if (error) throw error;
        alert('Kegiatan berhasil ditambahkan');
      }

      router.push('/admin/activities');
      router.refresh();
    } catch (error) {
      console.error('Error saving kegiatan:', error);
      if (error.code === '23505') {
        alert('Slug sudah digunakan, gunakan slug yang berbeda');
      } else {
        alert('Gagal menyimpan kegiatan: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
          </h1>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Kembali
          </button>
        </div>

        {/* Judul */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judul Kegiatan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan judul kegiatan"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="url-friendly-slug"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            URL: /kegiatan/{formData.slug || 'slug-kegiatan'}
          </p>
        </div>

        {/* Row: Tanggal & Lokasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="tanggal"
              value={formData.tanggal}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi
            </label>
            <input
              type="text"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Jakarta / Online"
            />
          </div>
        </div>

        {/* Row: Kategori & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pelatihan">Pelatihan</option>
              <option value="Publikasi">Publikasi</option>
              <option value="Kongres">Kongres</option>
              <option value="Workshop">Workshop</option>
              <option value="Seminar">Seminar</option>
              <option value="Diskusi">Diskusi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Ringkasan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ringkasan
          </label>
          <textarea
            name="ringkasan"
            value={formData.ringkasan}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ringkasan singkat kegiatan (muncul di card)"
          />
        </div>

        {/* Gambar Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gambar Cover
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Mengupload gambar...</p>
          )}
          {imagePreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Preview:</p>
              <div className="relative w-full h-64">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Konten */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Konten
          </label>
          <textarea
            name="konten"
            value={formData.konten}
            onChange={handleChange}
            rows={15}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Konten kegiatan (mendukung Markdown)"
          />
          <p className="text-xs text-gray-500 mt-1">
            Mendukung format Markdown (## heading, **bold**, - list, dll)
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Menyimpan...' : isEdit ? 'Update Kegiatan' : 'Simpan Kegiatan'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </form>
  );
}
