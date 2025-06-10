/** @type {import('next').NextConfig} */

const nextConfig = {
  // Add deployment flexibility
  output: process.env.NEXT_OUTPUT || 'standalone',
  
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "calculating-gopher-968.convex.cloud",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "calculating-gopher-968.convex.cloud",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add production optimizations
  compress: true,
  poweredByHeader: false,
  
  // Environment-specific redirects for Mat Bao
  async redirects() {
    return [
      // Redirect www to non-www for lagougah.com
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.lagougah.com',
          },
        ],
        destination: 'https://lagougah.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
