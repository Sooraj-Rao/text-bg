/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: false,
  },
  swcMinify: false,
  images: {
    domains: ["encrypted-tbn0.gstatic.com"], 
  },
};

export default nextConfig;
