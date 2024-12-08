import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['127.0.0.1', 'via.placeholder.com', 'planetgames.s3.amazonaws.com'], // Add your domains here
  },
  eslint: {
    // Disable eslint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
    ignoreDevErrors: true,
  },

};

export default nextConfig;
