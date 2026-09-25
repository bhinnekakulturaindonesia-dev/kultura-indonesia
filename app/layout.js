import './globals.css'
import 'react-quill/dist/quill.snow.css'
import ConditionalLayout from '../components/ConditionalLayout'

export const metadata = {
  metadataBase: new URL('https://studikulturaindonesia.vercel.app'),

  title: {
    default: 'Studi Kultura Indonesia - Riset Budaya, Toleransi & Media Sosial',
    template: '%s | Kultura Indonesia',
  },

  description:
    'Studi Kultura Indonesia fokus pada riset budaya, toleransi, analisis media sosial, dan digitalisasi Warisan Budaya Takbenda (WBTb). Kawan Toleran untuk Indonesia yang lebih inklusif.',

  keywords: [
    'Kultura Indonesia',
    'Studi Budaya Indonesia',
    'Riset Toleransi',
    'Analisis Media Sosial',
    'Publikasi Budaya',
    'Warisan Budaya Takbenda',
    'WBTb',
    'Digital Culture',
    'Social Media Analysis',
    'Cultural Studies',
    'Indonesian Culture',
    'Tolerance Research',
    'Data Kebudayaan',
    'Kawan Toleran',
  ],

  authors: [{ name: 'Studi Kultura Indonesia' }],
  creator: 'Studi Kultura Indonesia',
  publisher: 'Studi Kultura Indonesia',

  openGraph: {
    title: 'Studi Kultura Indonesia - Riset Budaya, Toleransi & Media Sosial',
    description:
      'Studi Kultura Indonesia fokus pada riset budaya, toleransi, analisis media sosial, dan digitalisasi Warisan Budaya Takbenda (WBTb). Kawan Toleran untuk Indonesia yang lebih inklusif.',
    url: 'https://studikulturaindonesia.vercel.app',
    siteName: 'Studi Kultura Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'Studi Kultura Indonesia',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Studi Kultura Indonesia',
    description:
      'Riset budaya, toleransi, dan analisis media sosial Indonesia.',
    images: ['/logo/logo.png'],
    creator: '@kulturaindonesia',
  },

  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#1e40af',
      },
    ],
  },

  manifest: '/favicon/site.webmanifest',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    // Add Google Search Console verification when ready
    // google: 'your-google-verification-code',
  },

  alternates: {
    canonical: 'https://studikulturaindonesia.vercel.app',
  },
}

export default function RootLayout({ children }) {
  // Structured Data for Organization
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Studi Kultura Indonesia',
    url: 'https://studikulturaindonesia.vercel.app',
    logo: 'https://studikulturaindonesia.vercel.app/logo/logo.png',
    description: 'Studi Kultura Indonesia fokus pada riset budaya, toleransi, analisis media sosial, dan digitalisasi Warisan Budaya Takbenda (WBTb).',
    sameAs: [
      // Add social media links here when available
      // 'https://twitter.com/kulturaindonesia',
      // 'https://www.facebook.com/kulturaindonesia',
      // 'https://www.instagram.com/kulturaindonesia',
    ],
  };

  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white">
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}
