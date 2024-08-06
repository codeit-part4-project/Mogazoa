/** @type {import('next').NextConfig} */

import sharp from 'sharp';

const nextConfig = {
  async rewrites() {
    return [
      // NextAuth 관련 경로는 내부적으로 처리
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      // 추가 인증 관련 경로들을 내부적으로 처리 (필요한 경우)
      {
        source: '/api/signin',
        destination: '/api/auth/signin',
      },
      {
        source: '/api/signout',
        destination: '/api/auth/signout',
      },
      // 그 외 모든 API 요청을 외부 API로 리다이렉트
      {
        source: '/api/:path*',
        destination: 'https://mogazoa-api.vercel.app/:path*',
      },
    ];
  },
  images: {
    domains: [
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'store.storeimages.cdn-apple.com',
      'img.danawa.com',
      'blog.kakaocdn.net',
      'via.placeholder.com',
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      // Split chunks to reduce file size
      config.optimization.splitChunks = {
        chunks: 'all',
        maxSize: 250000, // Set max size to 250KB
      };

      // Further optimizations
      config.optimization.runtimeChunk = 'single';
    }

    return config;
  },
};

export default nextConfig;
