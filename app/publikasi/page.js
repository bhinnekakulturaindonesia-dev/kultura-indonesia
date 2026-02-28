import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../../lib/publikasi'

export const metadata = {
  title: 'Publikasi',
}

export default function PublikasiPage() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">
        Publikasi
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/publikasi/${post.slug}`}
            className="group border rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-lg font-semibold group-hover:text-brand-blue transition">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {post.date}
              </p>

              <p className="text-gray-600 text-sm">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}