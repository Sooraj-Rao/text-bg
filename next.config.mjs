/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: false,
  },
  swcMinify: false,
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "hebbkx1anhila5yf.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
