import { getAllKegiatan, getKegiatanBySlug } from '../../../lib/kegiatan'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getAllKegiatan()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function KegiatanDetail({ params }) {
  try {
    const post = await getKegiatanBySlug(params.slug)

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        <p className="text-gray-500 mb-6">
          {post.date}
        </p>

        <div
          className="prose dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    )
  } catch (error) {
    return notFound()
  }
}