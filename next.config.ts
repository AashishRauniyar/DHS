
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "daily-health-suppliment.vercel.app"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],

  },
  experimental: {
    optimizeCss: true,
  },
  // Ensure static assets are properly served
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,

  
};

export default nextConfig;
