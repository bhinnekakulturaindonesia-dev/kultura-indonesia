import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),

  title: {
    default: 'Kultura Indonesia',
    template: '%s | Kultura Indonesia',
  },

  description:
    'Studi budaya, toleransi, dan analisis media sosial Indonesia. Kawan Toleran.',

  keywords: [
    'Kultura Indonesia',
    'Studi Budaya',
    'Toleransi',
    'Analisis Media Sosial',
    'Publikasi Budaya Indonesia',
  ],

  authors: [{ name: 'Studi Kultura Indonesia' }],
  creator: 'Studi Kultura Indonesia',
  publisher: 'Kultura Indonesia',

  openGraph: {
    title: 'Kultura Indonesia',
    description:
      'Studi budaya, toleransi, dan analisis media sosial Indonesia.',
    url: '/',
    siteName: 'Kultura Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/logo/logo.png',
        width: 800,
        height: 800,
        alt: 'Kultura Indonesia',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Kultura Indonesia',
    description:
      'Studi budaya, toleransi, dan analisis media sosial Indonesia.',
    images: ['/logo/logo.png'],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}