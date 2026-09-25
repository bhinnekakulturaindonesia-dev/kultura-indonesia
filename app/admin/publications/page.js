import AdminLayout from '@/components/admin/AdminLayout';
import PublikasiList from '@/components/admin/PublikasiList';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PublikasiPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <Link 
          href="/admin"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <span className="mr-2">←</span>
          Kembali ke Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Kelola Publikasi</h1>
        <p className="text-gray-600 mt-2">Buat, edit, dan kelola publikasi</p>
      </div>

      <PublikasiList />
    </AdminLayout>
  );
}
