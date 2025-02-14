/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  webpack: (config) => {
    config.bail = false; // Prevent Webpack from stopping on errors
    return config;
  },
};

export default nextConfig;
