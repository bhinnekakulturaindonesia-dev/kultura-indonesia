'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Beranda' },
  { href: '/publikasi', label: 'Publikasi' },
  { href: '/portofolio', label: 'Portofolio' },
  { href: '/kegiatan', label: 'Kegiatan' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  return (
    <header className="sticky top-0 z-50 bg-brand-navy text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo/logo.png"
            alt="Kultura Indonesia"
            width={40}
            height={40}
          />
          <span className="font-alata tracking-widest uppercase text-sm">
            Kultura Indonesia
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4 text-xs uppercase tracking-wider">
          {links.map(({ href, label }) => {
            const active =
              pathname === href ||
              (href !== '/' && pathname.startsWith(href))

            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded transition ${
                  active
                    ? 'bg-white/20'
                    : 'hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            )
          })}

          {/* Dark Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-4 px-3 py-1 border rounded-full text-xs hover:bg-white/10 transition"
          >
            {dark ? 'Light' : 'Dark'}
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-brand-navy border-t border-white/10 px-4 py-4 space-y-3">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block text-sm uppercase tracking-wider"
            >
              {label}
            </Link>
          ))}

          <button
            onClick={() => setDark(!dark)}
            className="mt-3 px-3 py-1 border rounded-full text-xs"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </header>
  )
}