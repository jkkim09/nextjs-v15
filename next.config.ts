import type { NextConfig } from 'next';
import tracer from 'dd-trace';

// dd-trace 초기화
// tracer.init({
//   service: 'nextjs-with-datadog',
//   logInjection: true,
//   env: process.env.NODE_ENV || 'production',
// });

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
  i18n: {
    locales: ['ko', 'en', 'ja'], // 지원 언어
    defaultLocale: 'ko', // 기본 언어
  },
  // 터미널 api 통신 로그
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // experimental: {
  //   // dd-trace 설정
  //   // serverComponentsExternalPackages: ['dd-trace'],
  // },
};

export default nextConfig;
