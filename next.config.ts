import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS === "true" ? "/elamer-real-estate-demo" : "",
  images: { unoptimized: true },
};

export default nextConfig;
