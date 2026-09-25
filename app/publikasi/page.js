import Link from 'next/link'
import Image from 'next/image'
import { getAllPublikasiFromDB } from '../../lib/publikasi-db'

export const metadata = {
  title: 'Publikasi',
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PublikasiPage() {
  const posts = await getAllPublikasiFromDB()

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
            {post.gambar_url && (
              <Image
                src={post.gambar_url}
                alt={post.judul}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
            )}

            <div className="p-5">
              <h2 className="text-lg font-semibold group-hover:text-brand-blue transition">
                {post.judul}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                {new Date(post.tanggal).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>

              <p className="text-gray-600 text-sm">
                {post.ringkasan}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}