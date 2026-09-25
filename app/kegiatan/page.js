import Link from 'next/link'
import Image from 'next/image'
import { getAllKegiatanFromDB } from '../../lib/kegiatan-db'

export const metadata = {
  title: 'Kegiatan',
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function KegiatanPage() {
  const posts = await getAllKegiatanFromDB()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">
        Kegiatan
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => {
          // For kegiatan from DB, we don't have externalUrl field
          // But we can add it later if needed
          const isExternal = false

          return (
            <Link
              key={post.slug}
              href={`/kegiatan/${post.slug}`}
              className="group block rounded-xl overflow-hidden bg-white dark:bg-[#0B1A35] border hover:shadow-lg transition"
            >
              {/* IMAGE SECTION */}
              {post.gambar_url && (
                <div className="w-full aspect-[4/3] bg-gray-50 dark:bg-[#081225] flex items-center justify-center overflow-hidden">
                  <Image
                    src={post.gambar_url}
                    alt={post.judul}
                    width={800}
                    height={600}
                    className="object-contain max-h-full transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-semibold group-hover:text-brand-blue transition text-gray-900 dark:text-white">
                  {post.judul}
                </h3>

                <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span>
                    📅 {new Date(post.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                  {post.lokasi && (
                    <span>📍 {post.lokasi}</span>
                  )}
                  {post.kategori && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      {post.kategori}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {post.ringkasan}
                </p>

                {/* BUTTON */}
                <div className="mt-4">
                  <span className="inline-block px-4 py-2 text-sm rounded-full text-white bg-blue-600">
                    BACA
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}