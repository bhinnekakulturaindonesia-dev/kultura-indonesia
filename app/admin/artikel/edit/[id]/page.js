'use client';

import { use } from 'react';
import ArtikelForm from '@/components/admin/ArtikelForm';
import AdminLayout from '@/components/admin/AdminLayout';

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic';

export default function EditArtikel({ params }) {
  const { id } = use(params);

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
        <p className="text-gray-600 mt-2">Update konten artikel</p>
      </div>

      <ArtikelForm artikelId={id} />
    </AdminLayout>
  );
}
