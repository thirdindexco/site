import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.*"],
  // Retired routes, kept alive so inbound links and search equity survive.
  // The audit became the design system sprint; information and projects
  // were folded into the single landing page.
  async redirects() {
    return [
      {
        source: "/audit",
        destination: "/systems",
        permanent: true,
      },
      {
        source: "/information",
        destination: "/#studio",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/#work",
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
