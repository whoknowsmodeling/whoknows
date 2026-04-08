import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Performance optimizations
  reactStrictMode: true,

  // Security & performance headers
  async headers() {
    return [
      // Immutable cache for static assets
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Security and performance headers for all routes
      {
        source: '/:path*',
        headers: [
          // DNS prefetch for faster external resource loading
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Prevents MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // HSTS — force HTTPS in production
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Permissions policy — restrict sensitive browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // XSS protection (legacy browsers)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/models',
        destination: '/women',
        permanent: true,
      },
      {
        source: '/model',
        destination: '/women',
        permanent: true,
      },
      {
        source: '/man',
        destination: '/men',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'whoknows.beauty',
          },
        ],
        destination: 'https://whoknowsmodels.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.whoknows.beauty',
          },
        ],
        destination: 'https://whoknowsmodels.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
