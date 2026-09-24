import AdminLayout from '@/components/admin/AdminLayout';
import ArtikelFormSimple from '@/components/admin/ArtikelFormSimple';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NewArtikelPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buat Artikel Baru</h1>
        <p className="text-gray-600 mt-2">Tulis dan publish artikel baru</p>
      </div>

      <ArtikelFormSimple />
    </AdminLayout>
  );
}
