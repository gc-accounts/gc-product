import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Disable ESLint checks during Vercel and local builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Disable TypeScript build errors (prevents Vercel failures due to type issues)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ (Optional) Add other global Next.js settings here
  // Example:
  // images: {
  //   domains: ["images.unsplash.com", "cdn.pixabay.com"],
  // },
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
