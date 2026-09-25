import NewsletterDashboard from '@/components/admin/NewsletterDashboard';
import AdminLayout from '@/components/admin/AdminLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Newsletter Subscribers - Admin',
  description: 'Manage newsletter subscribers'
};

export default function NewsletterPage() {
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
      <NewsletterDashboard />
    </AdminLayout>
  );
}
