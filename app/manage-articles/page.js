import ArtikelList from '@/components/admin/ArtikelList';

export const dynamic = 'force-dynamic';

export default function ManageArticles() {
  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Manage Articles</h1>
      <ArtikelList />
    </div>
  );
}
