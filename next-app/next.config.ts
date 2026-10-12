import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  poweredByHeader: false,
  // Running a preview alongside dev must not overwrite either server's chunks.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  // Each language has its own static root document with the correct HTML lang.
  experimental: { globalNotFound: true },
  images: {
    // WebP avoids AVIF's slower first-request encoding on the project library.
    formats: ["image/webp"],
    qualities: [65, 75, 90],
    deviceSizes: [640, 960, 1280, 1600, 1920],
    imageSizes: [96, 160, 320, 480],
    minimumCacheTTL: 86400,
  },
});
export default nextConfig;
