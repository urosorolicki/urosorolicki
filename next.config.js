/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false
  },
  images: {
    unoptimized: true
  },
  trailingSlash: true,
  output: 'export'
}

module.exports = nextConfig