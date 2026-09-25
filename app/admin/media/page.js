import MediaLibrary from '@/components/admin/MediaLibrary';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Media Library - Admin',
  description: 'Halaman admin untuk mengelola media dan file'
};

export default function MediaPage() {
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
      <MediaLibrary />
    </AdminLayout>
  );
}
