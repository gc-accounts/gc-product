import type { NextConfig } from "next";
import { redirectsList } from "@/redirects/rules";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ✅ TypeScript & ESLint settings
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },

  // ✅ Image domains and remote patterns
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.greycampus.com",
        pathname: "/hubfs/**",
      },
      {
        protocol: "https",
        hostname: "strapi.greycampus.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "strapi.odinschool.com", // ✅ Added for OdinSchool Strapi images
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },

  // ✅ Static asset caching for better performance
  async headers() {
    return [
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/uploads/:all*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ✅ Redirect rules (imported from /redirects/rules)
  async redirects() {
    return redirectsList;
  },

  // ✅ Turbopack placeholder (future config ready)
  turbopack: {},
};

export default withBundleAnalyzer(nextConfig);
