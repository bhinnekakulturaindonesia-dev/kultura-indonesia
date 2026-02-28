import Link from 'next/link'
import { socials } from '../lib/social'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-brand-navy border-t border-gray-200 dark:border-white/10 mt-20 transition-colors duration-500">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-gray-200 dark:border-white/10">

          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="font-alata text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Kultura Indonesia
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Studi budaya, toleransi, dan analisis percakapan publik di Indonesia 
              melalui perspektif kritis dan berbasis data.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-alata text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">
              Halaman
            </h4>

            <ul className="space-y-2">
              {[
                ['/', 'Beranda'],
                ['/publikasi', 'Publikasi'],
                ['/portofolio', 'Portofolio'],
                ['/kegiatan', 'Kegiatan'],
                ['/tentang-kami', 'Tentang Kami'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-blue dark:hover:text-brand-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="font-alata text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-4">
              Kontak
            </h4>

            <a
              href="mailto:riset@kulturaindonesia.or.id"
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-gold transition-colors mb-6"
            >
              riset@kulturaindonesia.or.id
            </a>

            <h4 className="font-alata text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">
              Media Sosial
            </h4>

            <div className="flex gap-3">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full 
                             bg-gray-200 dark:bg-brand-navy-light
                             flex items-center justify-center 
                             text-gray-600 dark:text-gray-300
                             hover:bg-brand-blue hover:text-white
                             dark:hover:bg-brand-gold dark:hover:text-brand-navy
                             transition-all duration-300 
                             hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d={icon} />
                  </svg>
                </a>
              ))}
            </div>

          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>
            © {new Date().getFullYear()} Kultura Indonesia. Semua hak dilindungi.
          </span>
          <span>
            Dibangun dengan Next.js
          </span>
        </div>

      </div>
    </footer>
  )
}