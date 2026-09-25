import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import NewsletterForm from './NewsletterForm';

// Fetch footer settings from database
async function getFooterSettings() {
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .in('category', ['footer', 'social-media']);

  const settings = {};
  data?.forEach(item => {
    settings[item.setting_key] = item.setting_value;
  });

  return settings;
}

// Social media icon paths
const socialIcons = {
  instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z',
  twitter: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.734l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  youtube: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  facebook: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  linkedin: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
};

export default async function Footer() {
  const settings = await getFooterSettings();

  // Build social media array from settings
  const socials = [
    settings.social_instagram && { href: settings.social_instagram, label: 'Instagram', icon: socialIcons.instagram },
    settings.social_twitter && { href: settings.social_twitter, label: 'Twitter/X', icon: socialIcons.twitter },
    settings.social_youtube && { href: settings.social_youtube, label: 'YouTube', icon: socialIcons.youtube },
    settings.social_facebook && { href: settings.social_facebook, label: 'Facebook', icon: socialIcons.facebook },
    settings.social_linkedin && { href: settings.social_linkedin, label: 'LinkedIn', icon: socialIcons.linkedin },
  ].filter(Boolean); // Remove empty entries

  return (
    <footer className="bg-gray-100 dark:bg-brand-navy border-t border-gray-200 dark:border-white/10 mt-20 transition-colors duration-500">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        
        <div className="flex flex-col md:flex-row justify-between gap-12 pb-12 border-b border-gray-200 dark:border-white/10">

          {/* Brand */}
          <div className="max-w-sm">
            <h3 className="font-alata text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {settings.footer_title || 'Kultura Indonesia'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {settings.footer_description || 'Studi budaya, toleransi, dan analisis percakapan publik di Indonesia melalui perspektif kritis dan berbasis data.'}
            </p>

            {/* Newsletter */}
            <div>
              <h4 className="font-alata text-sm tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-3">
                Newsletter
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {settings.footer_newsletter_text || 'Dapatkan update publikasi dan kegiatan terbaru kami melalui email.'}
              </p>
              <NewsletterForm />
            </div>
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
              href={`mailto:${settings.contact_email || 'riset@kulturaindonesia.or.id'}`}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-brand-blue dark:hover:text-brand-gold transition-colors mb-6"
            >
              {settings.contact_email || 'riset@kulturaindonesia.or.id'}
            </a>

            {socials.length > 0 && (
              <>
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
              </>
            )}

          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
          <span>
            {settings.footer_copyright || `© ${new Date().getFullYear()} Kultura Indonesia. Semua hak dilindungi.`}
          </span>
          <span>
            Dibangun dengan Next.js
          </span>
        </div>

      </div>
    </footer>
  );
}
