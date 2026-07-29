import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.*"],
  // The audit was retired in favor of the design system sprint; preserve
  // inbound links and search equity.
  async redirects() {
    return [
      {
        source: "/audit",
        destination: "/systems",
        permanent: true,
      },
      {
        source: "/embedded",
        destination: "/fractional",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
