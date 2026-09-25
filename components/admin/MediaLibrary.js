'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function MediaLibrary() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, artikel, publikasi, portofolio, kegiatan
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      
      // List all files from 'images' bucket
      const { data, error } = await supabase.storage
        .from('images')
        .list('', {
          limit: 1000,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      // Get all files including nested folders
      const allFiles = [];
      
      // Get files from root
      const rootFiles = data.filter(item => !item.id); // folders don't have id
      
      // Get files from subfolders
      const folders = data.filter(item => item.id === null);
      
      for (const folder of folders) {
        const { data: folderFiles, error: folderError } = await supabase.storage
          .from('images')
          .list(folder.name, {
            limit: 1000,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (!folderError && folderFiles) {
          folderFiles.forEach(file => {
            allFiles.push({
              ...file,
              folder: folder.name,
              fullPath: `${folder.name}/${file.name}`
            });
          });
        }
      }

      // Add files with metadata
      const filesWithUrls = allFiles.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(file.fullPath);

        return {
          ...file,
          url: publicUrl
        };
      });

      setFiles(filesWithUrls);
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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Tipe file tidak didukung. Gunakan JPG, PNG, GIF, WebP, atau PDF');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    try {
      setUploading(true);

      // Determine folder based on file type
      const isImage = file.type.startsWith('image/');
      const folder = isImage ? 'uploads' : 'uploads';

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

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

  const handleDelete = async (filePath) => {
    if (!confirm(`Yakin ingin menghapus file ini?\n${filePath}\n\nPeringatan: File yang sudah dipakai di artikel/publikasi/dll akan hilang gambarnya!`)) {
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) throw error;

      alert('File berhasil dihapus');
      fetchFiles(); // Refresh list
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Gagal menghapus file: ' + error.message);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL berhasil dicopy ke clipboard');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
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

  const filteredFiles = files.filter(file => {
    // Filter by folder
    if (filter !== 'all' && !file.folder?.includes(filter)) {
      return false;
    }
    // Filter by search query
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Memuat media library...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Media Library</h1>
        <p className="text-gray-600">Kelola semua gambar dan file yang diupload</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-2 block">
            Upload File Baru
          </span>
          <input
            type="file"
            accept="image/*,application/pdf"
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
          {uploading && (
            <p className="text-sm text-blue-600 mt-2">Mengupload file...</p>
          )}
        </label>
        <p className="text-xs text-gray-500 mt-2">
          Tipe file: JPG, PNG, GIF, WebP, PDF. Maksimal 5MB
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
              Semua ({files.length})
            </button>
            <button
              onClick={() => setFilter('artikel')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'artikel'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Artikel
            </button>
            <button
              onClick={() => setFilter('publikasi')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'publikasi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Publikasi
            </button>
            <button
              onClick={() => setFilter('portofolio')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'portofolio'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Portofolio
            </button>
            <button
              onClick={() => setFilter('kegiatan')}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                filter === 'kegiatan'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Kegiatan
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
          {filteredFiles.map((file) => {
            const isImage = file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i);
            const isPDF = file.name.match(/\.pdf$/i);

            return (
              <div key={file.fullPath} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
                {/* Preview */}
                <div className="relative h-48 bg-gray-100 flex items-center justify-center">
                  {isImage ? (
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                    />
                  ) : isPDF ? (
                    <div className="text-6xl">📄</div>
                  ) : (
                    <div className="text-6xl">📁</div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {file.folder && <span className="font-semibold">📁 {file.folder}</span>}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(file.metadata?.size || 0)} • {formatDate(file.created_at)}
                  </p>

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(file.url)}
                      className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      📋 Copy URL
                    </button>
                    <button
                      onClick={() => handleDelete(file.fullPath)}
                      className="bg-red-50 text-red-700 px-3 py-2 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
