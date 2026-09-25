import { getAllKegiatanFromDB, getKegiatanBySlug } from '../../../lib/kegiatan-db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageViewTracker from '@/components/PageViewTracker'
import ViewCount from '@/components/ViewCount'

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllKegiatanFromDB()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function KegiatanDetail({ params }) {
  const post = await getKegiatanBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16">
      <PageViewTracker pageType="kegiatan" pageSlug={post.slug} />

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Beranda
        </Link>
        <span> / </span>
        <Link href="/kegiatan" className="hover:text-blue-600">
          Kegiatan
        </Link>
      </nav>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {post.judul}
      </h1>

      {/* Meta Info */}
      <div className="text-gray-500 mb-8 flex flex-wrap gap-4">
        {post.tanggal && (
          <span>
            📅 {new Date(post.tanggal).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
        )}
        {post.lokasi && (
          <span>📍 {post.lokasi}</span>
        )}
        {post.kategori && (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {post.kategori}
          </span>
        )}
        <ViewCount slug={post.slug} type="kegiatan" />
      </div>

      {/* Cover Image */}
      {post.gambar_url && (
        <div className="rounded-2xl overflow-hidden mb-10 aspect-[4/3] bg-gray-50 flex items-center justify-center">
          <Image
            src={post.gambar_url}
            alt={post.judul}
            width={1000}
            height={800}
            className="object-contain max-h-full"
          />
        </div>
      )}

      {/* Content */}
      <div
        className="
          prose prose-lg max-w-none
          prose-headings:font-semibold
          dark:prose-invert
        "
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {/* Back */}
      <div className="mt-14 pt-8 border-t">
        <Link
          href="/kegiatan"
          className="text-blue-600 hover:underline"
        >
          ← Kembali ke Kegiatan
        </Link>
      </div>

    </article>
  )
}