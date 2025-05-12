/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static image imports
  images: {
    domains: ['images.unsplash.com'],
  },
  // Required for handling uploaded audio/video files
  experimental: {
    serverExternalPackages: ['fluent-ffmpeg'],
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 