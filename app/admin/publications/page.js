import AdminLayout from '@/components/admin/AdminLayout';
import PublikasiList from '@/components/admin/PublikasiList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PublikasiPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Publikasi</h1>
        <p className="text-gray-600 mt-2">Buat, edit, dan kelola publikasi</p>
      </div>

      <PublikasiList />
    </AdminLayout>
  );
}
