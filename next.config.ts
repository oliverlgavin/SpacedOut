import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spacelaunchnow-prod-east.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "thespacedevs-prod.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "thespacedevs-dev.nyc3.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "*.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "images-assets.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "*.staticflickr.com",
      },
    ],
  },
};

export default nextConfig;
