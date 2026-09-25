import { getAllPublikasiFromDB, getPublikasiBySlug } from '../../../lib/publikasi-db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import PageViewTracker from '@/components/PageViewTracker'
import ViewCount from '@/components/ViewCount'
import CommentForm from '@/components/CommentForm'
import CommentsList from '@/components/CommentsList'

export const revalidate = 60; // Revalidate every 60 seconds

export async function generateStaticParams() {
  const posts = await getAllPublikasiFromDB()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PublikasiDetail({ params }) {
  const post = await getPublikasiBySlug(params.slug)

  if (!post) {
    return notFound()
  }

  // Structured Data for Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.judul,
    description: post.ringkasan,
    image: post.gambar_url,
    datePublished: post.tanggal,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.penulis || 'Studi Kultura Indonesia',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Studi Kultura Indonesia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://studikulturaindonesia.vercel.app/logo/logo.png',
      },
    },
  };

    return (
      <>
        <PageViewTracker pageType="publikasi" pageSlug={post.slug} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <article className="max-w-3xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <span> / </span>
          <Link href="/publikasi" className="hover:text-blue-600">
            Publikasi
          </Link>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {post.judul}
        </h1>

        {/* Date & Author */}
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
          {post.penulis && (
            <span>
              ✍️ {post.penulis}
            </span>
          )}
          <ViewCount slug={post.slug} type="publikasi" />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/publikasi?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}

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

        {/* Content with Styled Download Links */}
        <div
          className="
            prose prose-lg max-w-none
            prose-headings:font-semibold
            prose-a:no-underline
            prose-a:inline-block
            prose-a:px-5
            prose-a:py-2
            prose-a:rounded-full
            prose-a:bg-blue-600
            prose-a:text-white
            prose-a:font-medium
            prose-a:mt-3
            hover:prose-a:bg-blue-700
            transition
            dark:prose-invert
          "
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Back */}
        <div className="mt-14 pt-8 border-t">
          <Link
            href="/publikasi"
            className="text-blue-600 hover:underline"
          >
            ← Kembali ke Publikasi
          </Link>
        </div>

        {/* Comments Section */}
        <div className="mt-16 space-y-8">
          <h2 className="text-2xl font-bold">Diskusi & Komentar</h2>
          
          {/* Existing Comments */}
          <CommentsList contentType="publikasi" contentSlug={post.slug} />
          
          {/* Comment Form */}
          <CommentForm contentType="publikasi" contentSlug={post.slug} />
        </div>

      </article>
      </>
    )
}