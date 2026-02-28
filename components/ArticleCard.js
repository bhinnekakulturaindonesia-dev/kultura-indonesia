import Link from 'next/link'
import Image from 'next/image'

export default function ArticleCard({ article }) {
  const { slug, judul, ringkasan, gambar_url, kategori, tanggal } = article
  const date = tanggal ? new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric'
  }) : null

  return (
    <Link href={`/artikel/${slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-md card-hover border border-gray-100">
      <div className="aspect-video overflow-hidden bg-gray-100">
        {gambar_url ? (
          <Image
            src={gambar_url}
            alt={judul}
            width={640} height={360}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-blue/10 to-brand-navy/10">
            <span className="font-alata text-brand-blue/40 text-4xl">KI</span>
          </div>
        )}
      </div>
      <div className="p-5">
        {kategori && (
          <span className="inline-block text-xs font-alata tracking-widest uppercase text-brand-blue bg-brand-blue/8 px-2.5 py-1 rounded-full mb-3">
            {kategori}
          </span>
        )}
        <h3 className="font-alata text-base font-semibold text-gray-900 leading-snug mb-2 group-hover:text-brand-blue transition-colors line-clamp-2">
          {judul}
        </h3>
        {ringkasan && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{ringkasan}</p>
        )}
        {date && (
          <p className="text-xs text-gray-400 font-cabin">{date}</p>
        )}
      </div>
    </Link>
  )
}
