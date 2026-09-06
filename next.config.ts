import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'europepmc.org',
      },
      {
        protocol: 'https',
        hostname: '**.ncbi.nlm.nih.gov',
      },
    ],
  },
};

export default nextConfig;
