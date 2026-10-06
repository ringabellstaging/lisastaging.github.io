import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Each language has its own static root document with the correct HTML lang.
  experimental: { globalNotFound: true },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [65, 75, 80, 85, 90],
    deviceSizes: [640, 960, 1280, 1600, 1920],
    imageSizes: [96, 160, 320, 480],
    minimumCacheTTL: 86400,
  },
};
export default nextConfig;
