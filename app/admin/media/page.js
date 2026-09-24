'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

export default function MediaLibrary() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    loadImages();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    }
  };

  const loadImages = async () => {
    try {
      // List all files from storage bucket
      const { data, error } = await supabase.storage
        .from('images')
        .list();

      if (error) throw error;

      // Get public URLs for all images
      const imageList = data.map(file => {
        const { data: { publicUrl } } = supabase.storage
          .from('images')
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: publicUrl,
          size: file.metadata?.size || 0,
          created: file.created_at,
        };
      });

      setImages(imageList);
    } catch (error) {
      console.error('Error loading images:', error);
      // If bucket doesn't exist, show empty state
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      for (const file of files) {
        // Validate
        if (!file.type.startsWith('image/')) {
          alert(`${file.name} bukan file gambar!`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} terlalu besar (max 5MB)!`);
          continue;
        }

        // Upload
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = fileName;

        const { error } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (error) throw error;
      }

      alert(`Berhasil upload ${files.length} gambar!`);
      loadImages();
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Gagal upload: ' + error.message);
    } finally {
      setUploading(false);
      e.target.value = ''; // Reset input
    }
  };

  const handleDelete = async (fileName) => {
    if (!confirm(`Yakin ingin menghapus ${fileName}?`)) return;

    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([fileName]);

      if (error) throw error;
      
      alert('Gambar berhasil dihapus!');
      loadImages();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus: ' + error.message);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL berhasil dicopy!');
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
        <p className="text-gray-600 mt-2">Upload dan kelola gambar</p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Gambar</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className={`cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-6xl mb-4">📤</div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              {uploading ? 'Uploading...' : 'Click to upload atau drag & drop'}
            </p>
            <p className="text-sm text-gray-500">
              PNG, JPG, GIF hingga 5MB (bisa multiple files)
            </p>
          </label>
        </div>
      </div>

      {/* Images Grid */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Gambar Tersedia ({images.length})
        </h2>

        {images.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">Belum ada gambar</p>
            <p className="text-sm">Upload gambar pertama kamu di atas</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div
                key={image.name}
                className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                    <button
                      onClick={() => copyToClipboard(image.url)}
                      className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
                      title="Copy URL"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={() => handleDelete(image.name)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Filename */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 truncate">
                  {image.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <h3 className="font-medium text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Click tombol "Copy" untuk menyalin URL gambar</li>
          <li>• Paste URL di field "URL Gambar" saat buat artikel/portofolio</li>
          <li>• Gunakan gambar dengan ukuran optimal untuk web (max 2MB)</li>
          <li>• Format yang didukung: JPG, PNG, GIF, WebP</li>
        </ul>
      </div>
    </AdminLayout>
  );
}
