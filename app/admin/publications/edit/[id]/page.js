import AdminLayout from '@/components/admin/AdminLayout';
import PublikasiForm from '@/components/admin/PublikasiForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function EditPublikasiPage({ params }) {
  const { id } = params;

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Publikasi</h1>
        <p className="text-gray-600 mt-2">Update konten publikasi</p>
      </div>

      <PublikasiForm publikasiId={id} />
    </AdminLayout>
  );
}
