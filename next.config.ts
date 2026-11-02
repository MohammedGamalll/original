import type { NextConfig } from "next";

/**
 * Static export for Hostinger. Cache Components and partial prefetching stay
 * off because they require a Node.js server, which this hosting setup does not run.
 * next/image optimization is unavailable without a server, so images are
 * pre-encoded to WebP and served with `unoptimized`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
