import AdminLayout from '@/components/admin/AdminLayout';
import PortofolioForm from '@/components/admin/PortofolioForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NewPortfolioPage() {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Buat Portofolio Baru</h1>
        <p className="text-gray-600 mt-2">Tambahkan portofolio baru</p>
      </div>

      <PortofolioForm />
    </AdminLayout>
  );
}
