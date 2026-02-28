import { getAllPosts, getPostBySlug } from '../../../lib/publikasi'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PublikasiDetail({ params }) {
  try {
    const post = await getPostBySlug(params.slug)

    return (
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
          {post.title}
        </h1>

        {/* Date */}
        {post.date && (
          <p className="text-gray-500 mb-8">
            {post.date}
          </p>
        )}

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10 aspect-[4/3] bg-gray-50 flex items-center justify-center">
            <Image
              src={post.coverImage}
              alt={post.title}
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
          dangerouslySetInnerHTML={{ __html: post.content }}
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

      </article>
    )
  } catch {
    return notFound()
  }
}