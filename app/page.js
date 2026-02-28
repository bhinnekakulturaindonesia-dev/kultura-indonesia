import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '../lib/publikasi'

export default function HomePage() {
  const posts = getAllPosts()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6)

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br 
        from-[#e6edf3] via-[#dfe6ec] to-[#cfd7df]
        dark:from-brand-navy dark:via-brand-navy-soft dark:to-brand-navy">

        <div className="relative max-w-5xl mx-auto px-4 py-32 text-center">

          <p className="text-xs tracking-[6px] uppercase text-brand-blue dark:text-brand-gold mb-10">
            Studi Budaya & Media Sosial
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Halo, Kami
          </h1>

          <h2 className="text-5xl md:text-6xl font-bold text-brand-blue dark:text-brand-gold mb-10 leading-tight">
            Studi Kultura Indonesia
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-12">
            Mengkaji budaya, toleransi, dan dinamika percakapan publik di Indonesia
            melalui perspektif kritis dan berbasis data.
          </p>

          <div className="flex justify-center gap-6">
            <Link href="/publikasi" className="btn-primary">
              Baca Publikasi →
            </Link>

            <Link href="/tentang-kami" className="btn-outline dark:border-brand-gold dark:text-brand-gold">
              Tentang Kami
            </Link>
          </div>

        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-24 text-white dark:text-brand-navy"
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,69.3L1440,75V120H0Z"
            />
          </svg>
        </div>
      </section>

      {/* ================= SIAPA KAMI ================= */}
      <section className="py-24 bg-white dark:bg-brand-navy transition-colors">
        <div className="max-w-5xl mx-auto px-4 text-center">

          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Siapa Kami
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
            Studi Kultura Indonesia adalah inisiatif riset independen yang
            mengkaji budaya, toleransi, dan dinamika media sosial di Indonesia
            melalui pendekatan kritis dan berbasis data.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {['Studi Budaya', 'Toleransi', 'Media Sosial'].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl border bg-white 
                           dark:bg-brand-navy-light 
                           dark:border-white/10
                           hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg mb-3 text-gray-900 dark:text-gray-100">
                  {item}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Analisis kritis dan berbasis data terhadap dinamika sosial digital.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PUBLIKASI TERBARU ================= */}
      <section className="py-24 bg-gray-50 dark:bg-brand-navy-soft transition-colors">
        <div className="max-w-6xl mx-auto px-4">

          <h2 className="text-2xl font-bold mb-12 text-gray-900 dark:text-gray-100">
            Publikasi Terbaru
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/publikasi/${post.slug}`}
                className="group rounded-xl overflow-hidden bg-white 
                           dark:bg-brand-navy-light 
                           dark:border dark:border-white/10
                           hover:shadow-lg transition"
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

                <div className="p-6">
                  <h3 className="text-lg font-semibold group-hover:text-brand-blue transition text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {post.date}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  )
}