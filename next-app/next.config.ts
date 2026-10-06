import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 960, 1280, 1600, 1920],
    imageSizes: [96, 160, 320, 480],
    minimumCacheTTL: 86400,
  },
};
export default nextConfig;
