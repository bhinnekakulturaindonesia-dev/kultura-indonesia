import AdminLayout from '@/components/admin/AdminLayout';
import PortofolioList from '@/components/admin/PortofolioList';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PortfolioPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Kelola Portofolio</h1>
        <p className="text-gray-600 mt-2">Buat, edit, dan kelola portofolio</p>
      </div>

      <PortofolioList />
    </AdminLayout>
  );
}
