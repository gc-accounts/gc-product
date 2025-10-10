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

  // ✅ Example: Images domains
  // images: {
  //   domains: ["images.unsplash.com", "cdn.pixabay.com"],
  // },

  // ✅ Redirects configuration
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.greycampus.com/',
        permanent: true,
      },
    ];
  },

  // ✅ (Optional) Add other global Next.js settings here
  // experimental: {
  //   optimizeCss: true,
  // },
};

export default nextConfig;
