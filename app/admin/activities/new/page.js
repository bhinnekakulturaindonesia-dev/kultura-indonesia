import KegiatanForm from '@/components/admin/KegiatanForm';

export const metadata = {
  title: 'Tambah Kegiatan Baru - Admin',
  description: 'Form untuk menambah kegiatan baru'
};

export default function NewActivityPage() {
  return <KegiatanForm />;
}
