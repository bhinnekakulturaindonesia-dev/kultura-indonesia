/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'web.archive.org' },
      { protocol: 'https', hostname: 'kulturaindonesia.or.id' },
    ],
  },
}
module.exports = nextConfig
