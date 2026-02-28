import Link from 'next/link'
import Image from 'next/image'
import { getAllKegiatan } from '../../lib/kegiatan'

export const metadata = {
  title: 'Kegiatan',
}

export default function KegiatanPage() {
  const posts = getAllKegiatan().sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-10">
        Kegiatan
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => {
          const isExternal = !!post.externalUrl

          const Wrapper = isExternal ? 'a' : Link
          const wrapperProps = isExternal
            ? {
                href: post.externalUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {
                href: `/kegiatan/${post.slug}`,
              }

          return (
            <Wrapper
              key={post.slug}
              {...wrapperProps}
              className="group block rounded-xl overflow-hidden bg-white dark:bg-[#0B1A35] border hover:shadow-lg transition"
            >
              {/* IMAGE SECTION */}
              {post.coverImage && (
                <div className="w-full aspect-[4/3] bg-gray-50 dark:bg-[#081225] flex items-center justify-center overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={800}
                    height={600}
                    className="object-contain max-h-full transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              {/* CONTENT */}
              <div className="p-6">
                <h3 className="text-lg font-semibold group-hover:text-brand-blue transition text-gray-900 dark:text-white">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {post.date}
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {post.excerpt}
                </p>

                {/* BUTTON */}
                <div className="mt-4">
                  <span
                    className={`inline-block px-4 py-2 text-sm rounded-full text-white ${
                      isExternal ? 'bg-red-600' : 'bg-blue-600'
                    }`}
                  >
                    {isExternal ? 'LIHAT' : 'BACA'}
                  </span>
                </div>
              </div>
            </Wrapper>
          )
        })}
      </div>
    </div>
  )
}