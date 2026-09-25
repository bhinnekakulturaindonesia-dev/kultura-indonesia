'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import AdminLayout from './AdminLayout';

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, team, gallery, general
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadCategory, setUploadCategory] = useState('general');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // Fetch from database (media table)
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error);
      alert('Gagal memuat file: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    try {
      setUploading(true);

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // Get image dimensions
      let width = null;
      let height = null;
      if (file.type.startsWith('image/')) {
        const img = await createImageBitmap(file);
        width = img.width;
        height = img.height;
      }

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('media')
        .insert({
          filename: fileName,
          original_name: file.name,
          file_path: filePath,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          width,
          height,
          category: uploadCategory,
          uploaded_by: user?.id
        });

      if (dbError) throw dbError;

      alert('File berhasil diupload');
      fetchFiles(); // Refresh file list
      e.target.value = ''; // Reset input
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Gagal mengupload file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    if (!confirm(`Yakin ingin menghapus file ini?\n${file.original_name}\n\nPeringatan: File yang sudah dipakai akan hilang gambarnya!`)) {
      return;
    }

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      alert('File berhasil dihapus');
      fetchFiles(); // Refresh list
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Gagal menghapus file: ' + error.message);
    }
  };

  const handleUpdateCategory = async (fileId, newCategory) => {
    try {
      const { error } = await supabase
        .from('media')
        .update({ category: newCategory })
        .eq('id', fileId);

      if (error) throw error;

      alert('Kategori berhasil diupdate');
      fetchFiles(); // Refresh list
    } catch (error) {
      console.error('Error updating category:', error);
      alert('Gagal update kategori: ' + error.message);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL berhasil dicopy ke clipboard');
  };

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (category) => {
    const labels = {
      team: '👥 Tim Kami',
      gallery: '🖼️ Galeri',
      general: '📁 Umum'
    };
    return labels[category] || category;
  };

  const getCategoryCount = (category) => {
    if (category === 'all') return files.length;
    return files.filter(f => f.category === category).length;
  };

  const filteredFiles = files.filter(file => {
    // Filter by category
    if (filter !== 'all' && file.category !== filter) {
      return false;
    }
    // Filter by search query
    if (searchQuery && !file.original_name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Memuat media library...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Media Library</h1>
          <p className="text-gray-600">Kelola semua gambar dan file yang diupload</p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload File Baru</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="general">📁 Umum</option>
                <option value="team">👥 Tim Kami</option>
                <option value="gallery">🖼️ Galeri Dokumentasi</option>
              </select>
            </div>

            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {uploading && (
            <p className="text-sm text-blue-600">Mengupload file...</p>
          )}
          <p className="text-xs text-gray-500">
            Tipe file: JPG, PNG, GIF, WebP. Maksimal 5MB
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filter Buttons */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Semua ({getCategoryCount('all')})
              </button>
              <button
                onClick={() => setFilter('team')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'team'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👥 Tim ({getCategoryCount('team')})
              </button>
              <button
                onClick={() => setFilter('gallery')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'gallery'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🖼️ Galeri ({getCategoryCount('gallery')})
              </button>
              <button
                onClick={() => setFilter('general')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'general'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📁 Umum ({getCategoryCount('general')})
              </button>
            </div>

            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama file..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Files Grid */}
        {filteredFiles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
            {searchQuery ? 'Tidak ada file yang cocok dengan pencarian' : 'Belum ada file'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                {/* Preview */}
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={file.file_url}
                    alt={file.original_name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate" title={file.original_name}>
                    {file.original_name}
                  </p>
                  
                  {/* Category Dropdown */}
                  <div className="mt-2">
                    <select
                      value={file.category}
                      onChange={(e) => handleUpdateCategory(file.id, e.target.value)}
                      className="w-full text-xs px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="general">📁 Umum</option>
                      <option value="team">👥 Tim Kami</option>
                      <option value="gallery">🖼️ Galeri</option>
                    </select>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    {formatFileSize(file.file_size)} • {file.width}×{file.height}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(file.created_at)}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(file.file_url)}
                      className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      📋 Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="bg-red-50 text-red-700 px-3 py-2 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

