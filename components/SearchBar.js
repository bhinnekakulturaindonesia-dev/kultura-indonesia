'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const pathname = usePathname();

  // Reset search state on route change
  useEffect(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // Wait 300ms after user stops typing

    return () => clearTimeout(timer);
  }, [query]);

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
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
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari publikasi, kegiatan..."
          style={{ color: '#1f2937' }}
          className="w-full px-4 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2">
              Ditemukan {results.length} hasil
            </div>
            
            {results.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.url}
                onClick={handleResultClick}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  {result.gambar_url && (
                    <div className="flex-shrink-0 w-16 h-16 relative rounded overflow-hidden bg-gray-100">
                      <Image
                        src={result.gambar_url}
                        alt={result.judul}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-blue-600">
                        {getTypeLabel(result.type)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatDate(result.tanggal)}
                      </span>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                      {result.judul}
                    </h3>
                    
                    {result.ringkasan && (
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {result.ringkasan}
                      </p>
                    )}

                    {result.penulis && (
                      <p className="text-xs text-gray-500 mt-1">
                        oleh {result.penulis}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Link */}
          <div className="border-t border-gray-200 p-2">
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={handleResultClick}
              className="block text-center text-sm text-blue-600 hover:text-blue-700 py-2"
            >
              Lihat semua hasil untuk "{query}"
            </Link>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && !loading && results.length === 0 && query.length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-500 text-center">
            Tidak ada hasil untuk "{query}"
          </p>
        </div>
      )}
    </div>
  );
}
