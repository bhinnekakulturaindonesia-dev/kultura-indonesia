'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',             label: 'Beranda' },
  { href: '/artikel',      label: 'Publikasi' },
  { href: '/portofolio',   label: 'Portofolio' },
  { href: '/kegiatan',     label: 'Kegiatan' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-brand-navy/95 backdrop-blur border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between min-h-[70px] gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
          <img
            src="https://web.archive.org/web/20251013021605im_/https://kulturaindonesia.or.id/wp-content/uploads/2021/12/logo-alt-e1639639254176.png"
            alt="Kultura Indonesia"
            className="w-10 h-10 rounded-full object-contain"
            onError={e => e.target.style.display = 'none'}
          />
          <div>
            <span className="font-alata text-white text-base font-black tracking-widest uppercase block leading-none">
              Kultura Indonesia
            </span>
            <span className="text-white/50 text-[10px] tracking-[3px] uppercase">Kawan Toleran</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`font-alata text-[13px] tracking-widest uppercase px-4 py-2 rounded transition-all
                  ${active
                    ? 'text-white border-b-2 border-brand-gold rounded-b-none'
                    : 'text-white/70 hover:text-white hover:bg-white/10'}`}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-brand-navy border-t border-white/10">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block font-alata text-sm tracking-widest uppercase px-6 py-3 transition-colors
                ${pathname === href ? 'text-brand-gold bg-white/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
