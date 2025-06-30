import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [320, 640, 768, 1024, 1280],
    imageSizes: [16, 32, 64, 128, 256],
    minimumCacheTTL: 86400,
    domains: ["qhyracsvbpyhidrakxdt.supabase.co"],
  },
};

export default nextConfig;
