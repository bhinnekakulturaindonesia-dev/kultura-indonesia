import KegiatanList from '@/components/admin/KegiatanList';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Kelola Kegiatan - Admin',
  description: 'Halaman admin untuk mengelola kegiatan'
};

export default function ActivitiesPage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <Link 
          href="/admin"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
        >
          <span className="mr-2">←</span>
          Kembali ke Dashboard
        </Link>
      </div>
      <KegiatanList />
    </AdminLayout>
  );
}
