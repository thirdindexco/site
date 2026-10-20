import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.*"],
  // Retired routes, kept alive so inbound links and search equity survive.
  // The separate engagement tiers (audit, build, prototype, design system)
  // collapsed into one week-priced project page; information and projects
  // were folded into the single landing page.
  async redirects() {
    return [
      {
        source: "/audit",
        destination: "/project",
        permanent: true,
      },
      {
        source: "/sprint",
        destination: "/project",
        permanent: true,
      },
      {
        source: "/prototype",
        destination: "/project",
        permanent: true,
      },
      {
        source: "/systems",
        destination: "/project",
        permanent: true,
      },
      {
        source: "/frontend-audit",
        destination: "/project",
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
