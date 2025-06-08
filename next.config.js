/** @type {import('next').NextConfig} */

// Check if we're in Vercel/CI environment
const isVercel = !!(
  process.env.VERCEL || 
  process.env.VERCEL_ENV || 
  process.env.VERCEL_URL || 
  process.env.CI
);

console.log('Next.js config - Environment check:', {
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_URL: process.env.VERCEL_URL,
  CI: process.env.CI,
  isVercel
});

const nextConfig = {
  // Only use static export for local builds, not Vercel/CI
  ...(isVercel ? {} : { 
    output: 'export',
    trailingSlash: true,
    distDir: 'out'
  }),
  
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
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
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
