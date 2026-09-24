'use client';

import ArtikelForm from '@/components/admin/ArtikelForm';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function NewArtikel() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buat Artikel Baru</h1>
        <p className="text-gray-600 mt-2">Tulis dan publish artikel baru</p>
      </div>

      <ArtikelForm />
    </AdminLayout>
  );
}
