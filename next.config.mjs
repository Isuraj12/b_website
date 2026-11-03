/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "framer-motion"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
