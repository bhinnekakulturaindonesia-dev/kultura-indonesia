// Force all admin pages to use dynamic rendering
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default function AdminRootLayout({ children }) {
  return children;
}
