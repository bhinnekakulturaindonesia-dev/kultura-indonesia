import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { portofolio } from '../../../lib/portofolio'

export async function generateStaticParams() {
  return portofolio
    .filter((item) => item.isDetailPage)
    .map((item) => ({
      slug: item.id,
    }))
}

export default function PortofolioDetail({ params }) {
  const item = portofolio.find((p) => p.id === params.slug)

  if (!item) return notFound()

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">

      <Link href="/portofolio" className="text-blue-600 mb-8 inline-block">
        ← Kembali ke Portofolio
      </Link>

      <h1 className="text-3xl font-bold mb-6">{item.title}</h1>

      {item.image && (
        <div className="mb-10 rounded-2xl overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      <p className="text-lg text-gray-600">{item.description}</p>
    </div>
  )
}