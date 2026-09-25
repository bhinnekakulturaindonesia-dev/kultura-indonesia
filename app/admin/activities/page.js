import KegiatanList from '@/components/admin/KegiatanList';

export const metadata = {
  title: 'Kelola Kegiatan - Admin',
  description: 'Halaman admin untuk mengelola kegiatan'
};

export default function ActivitiesPage() {
  return <KegiatanList />;
}
