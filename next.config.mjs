/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: false,
  },
  swcMinify: false,
};

export default nextConfig;
