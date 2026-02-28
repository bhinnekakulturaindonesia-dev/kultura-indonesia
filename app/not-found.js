import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="font-alata text-7xl font-bold text-brand-blue/20 mb-4">404</p>
      <h1 className="font-alata text-2xl font-bold text-gray-900 mb-3">Halaman Tidak Ditemukan</h1>
      <p className="text-gray-500 mb-8 font-cabin">Halaman yang kamu cari tidak ada atau sudah dipindahkan.</p>
      <Link href="/" className="btn-primary">Kembali ke Beranda</Link>
    </div>
  )
}
