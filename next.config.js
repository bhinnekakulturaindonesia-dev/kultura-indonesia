/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Disable static export, use server-side rendering
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'web.archive.org' },
      { protocol: 'https', hostname: 'kulturaindonesia.or.id' },
    ],
  },
  // Skip static generation for admin pages
  skipTrailingSlashRedirect: true,
  experimental: {
    appDir: true,
  },
}
module.exports = nextConfig
