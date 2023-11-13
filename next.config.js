const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sleeep23.notion.site",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
