import Link from 'next/link'
import Image from 'next/image'
import { getAllPublikasiFromDB } from '../../lib/publikasi-db'

export const metadata = {
  title: 'Publikasi',
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PublikasiPage({ searchParams }) {
  const posts = await getAllPublikasiFromDB()
  const selectedTag = searchParams?.tag || null

  // Filter by tag if selected
  const filteredPosts = selectedTag
    ? posts.filter(post => post.tags && post.tags.includes(selectedTag))
    : posts

  // Get all unique tags
  const allTags = [...new Set(posts.flatMap(post => post.tags || []))].sort()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">
        Publikasi
      </h1>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-3">Filter berdasarkan kategori:</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/publikasi"
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedTag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Semua ({posts.length})
            </Link>
            {allTags.map(tag => {
              const count = posts.filter(post => post.tags && post.tags.includes(tag)).length
              return (
                <Link
                  key={tag}
                  href={`/publikasi?tag=${encodeURIComponent(tag)}`}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {tag} ({count})
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Results Count */}
      {selectedTag && (
        <p className="text-sm text-gray-600 mb-4">
          Menampilkan {filteredPosts.length} publikasi dengan tag "{selectedTag}"
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
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

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}