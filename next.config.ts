import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cleanDistDir: true,
  poweredByHeader: false,
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  output: 'standalone',
  // 터미널 api 통신 로그
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
