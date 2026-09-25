import '../globals.css';

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
  // Admin layout WITHOUT Navbar and Footer
  return (
    <html lang="id">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  );
}
