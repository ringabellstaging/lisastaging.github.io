import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx', 'server.ts'],
  images: { unoptimized: true,}
};

if (process.env.NEXT_OUTPUT === 'export') {
  nextConfig.pageExtensions = ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
}

export default nextConfig;
