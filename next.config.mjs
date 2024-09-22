/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.thecatapi.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
      },
    ],
  },
}

export default nextConfig
