import AdminLayout from '@/components/admin/AdminLayout';
import ArtikelFormSimple from '@/components/admin/ArtikelFormSimple';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EditArtikelPage({ params }) {
  const { id } = params;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Artikel</h1>
        <p className="text-gray-600 mt-2">Update konten artikel</p>
      </div>

      <ArtikelFormSimple artikelId={id} />
    </AdminLayout>
  );
}
