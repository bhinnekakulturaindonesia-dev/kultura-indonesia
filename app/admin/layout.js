// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AdminRootLayout({ children }) {
  return children;
}
