// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Admin-specific metadata
export const metadata = {
  title: {
    default: 'Admin Dashboard | Kultura Indonesia',
    template: '%s | Admin | Kultura Indonesia',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  // Admin pages get their own AdminLayout (sidebar) rendered per-page.
  // No <html>/<body> here — those belong only in the root app/layout.js.
  // No public Navbar/Footer here either — ConditionalLayout hides them for /admin routes.
  return (
    <div className="bg-gray-100 min-h-screen">
      {children}
    </div>
  );
}
