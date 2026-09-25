import KegiatanForm from '@/components/admin/KegiatanForm';

export const metadata = {
  title: 'Edit Kegiatan - Admin',
  description: 'Form untuk mengedit kegiatan'
};

export default function EditActivityPage({ params }) {
  return <KegiatanForm kegiatanId={params.id} />;
}
