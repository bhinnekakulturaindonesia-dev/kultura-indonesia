/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'web.archive.org' },
      { protocol: 'https', hostname: 'kulturaindonesia.or.id' },
    ],
  },

  // Redirect dari domain lama ke domain baru
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'studikulturaindonesia.vercel.app' }],
        destination: 'https://kulturaindonesia.or.id/:path*',
        permanent: true, // 301 redirect
      },
    ]
  },
}
module.exports = nextConfig
