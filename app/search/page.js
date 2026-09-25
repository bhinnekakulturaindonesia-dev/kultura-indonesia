'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!query || query.length < 2) {
      setLoading(false);
      return;
    }

    fetchResults();
  }, [query, filter]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? `/api/search?q=${encodeURIComponent(query)}`
        : `/api/search?q=${encodeURIComponent(query)}&type=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeLabel = (type) => {
    const labels = {
      publikasi: '📚 Publikasi',
      kegiatan: '📅 Kegiatan',
      artikel: '📝 Artikel'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredResults = results.filter(result => 
    filter === 'all' || result.type === filter
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Hasil Pencarian
        </h1>
        {query && (
          <p className="text-gray-600">
            Menampilkan hasil untuk: <span className="font-semibold">"{query}"</span>
          </p>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Semua ({results.length})
        </button>
        <button
          onClick={() => setFilter('publikasi')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filter === 'publikasi'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Publikasi ({results.filter(r => r.type === 'publikasi').length})
        </button>
        <button
          onClick={() => setFilter('kegiatan')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filter === 'kegiatan'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Kegiatan ({results.filter(r => r.type === 'kegiatan').length})
        </button>
        <button
          onClick={() => setFilter('artikel')}
          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
            filter === 'artikel'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Artikel ({results.filter(r => r.type === 'artikel').length})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 mt-4">Mencari...</p>
        </div>
      )}

      {/* No Query */}
      {!loading && !query && (
        <div className="text-center py-12">
          <p className="text-gray-500">Masukkan kata kunci pencarian</p>
        </div>
      )}

      {/* No Results */}
      {!loading && query && filteredResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            Tidak ada hasil ditemukan untuk "{query}"
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      )}

      {/* Results Grid */}
      {!loading && filteredResults.length > 0 && (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Ditemukan {filteredResults.length} hasil
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.url}
                className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                {/* Image */}
                {result.gambar_url && (
                  <div className="relative w-full h-48 bg-gray-100">
                    <Image
                      src={result.gambar_url}
                      alt={result.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  {/* Type Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-blue-600">
                      {getTypeLabel(result.type)}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(result.tanggal)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold group-hover:text-blue-600 transition mb-2">
                    {result.judul}
                  </h2>

                  {/* Excerpt */}
                  {result.ringkasan && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {result.ringkasan}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    {result.penulis && (
                      <span>oleh {result.penulis}</span>
                    )}
                    {result.lokasi && (
                      <span>📍 {result.lokasi}</span>
                    )}
                    {result.kategori && (
                      <span className="px-2 py-1 bg-gray-100 rounded">
                        {result.kategori}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
