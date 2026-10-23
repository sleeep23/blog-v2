import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
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

export default withContentCollections(nextConfig);
