'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '🏠' },
    { name: 'Artikel', path: '/admin/articles', icon: '📝' },
    { name: 'Publikasi', path: '/admin/publications', icon: '📚' },
    { name: 'Portofolio', path: '/admin/portfolio', icon: '🎨' },
    { name: 'Kegiatan', path: '/admin/activities', icon: '📅' },
    { name: 'Media', path: '/admin/media', icon: '🖼️' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📊' },
    { name: 'Newsletter', path: '/admin/newsletter', icon: '📧' },
    { name: 'Comments', path: '/admin/comments', icon: '💬' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile top bar with hamburger button (visible only on small screens) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-gray-900 text-white flex items-center justify-between px-4 z-40">
        <span className="font-bold">Kultura Indonesia</span>
        <button
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
          className="p-2 -mr-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Overlay behind the drawer, only when open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: off-canvas drawer on mobile, fixed column on desktop */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-50 transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Kultura Indonesia</h1>
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
          </div>
          {/* Close button, mobile only */}
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            className="md:hidden p-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-2 overflow-y-auto max-h-[calc(100vh-220px)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-6 py-3 hover:bg-gray-800 transition-colors ${
                  isActive ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <a
            href="/"
            target="_blank"
            className="block w-full text-center py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg mb-2 transition-colors"
          >
            🌐 Lihat Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 pt-14 md:pt-0 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
