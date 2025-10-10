

import { NextConfig } from "next/types";
const nextConfig: NextConfig = {
  // ✅ Disable ESLint during build (Vercel + local)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // (Optional) You can add other Next.js config here later
  // e.g., experimental, images, redirects, etc.
};

export default nextConfig;
