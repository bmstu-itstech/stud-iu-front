import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '83.219.97.247',
        port: '8000',
        pathname: '/media/images/events/**',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;