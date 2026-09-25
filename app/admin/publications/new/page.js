import AdminLayout from '@/components/admin/AdminLayout';
import PublikasiForm from '@/components/admin/PublikasiForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NewPublikasiPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buat Publikasi Baru</h1>
        <p className="text-gray-600 mt-2">Tulis dan publish publikasi baru</p>
      </div>

      <PublikasiForm />
    </AdminLayout>
  );
}
