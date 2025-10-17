import type { NextConfig } from "next";
import { redirectsList } from "@/redirects/rules";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // ✅ TypeScript & ESLint
  eslint: { ignoreDuringBuilds: false },
  typescript: { ignoreBuildErrors: false },

  // ✅ Image domains
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
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },

  // ✅ Static asset caching
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

  // ✅ Redirect rules
  async redirects() {
    return redirectsList;
  },

  // ✅ Turbopack configuration (new standard)
  turbopack: {
    // Example future-proof area (safe empty object)
    // You can add rules here later if needed
  },
};

export default withBundleAnalyzer(nextConfig);
