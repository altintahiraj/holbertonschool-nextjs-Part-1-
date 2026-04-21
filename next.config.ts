import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These packages must never be bundled for the browser or edge runtime
  serverExternalPackages: ["mysql2", "bcryptjs"],
};

export default nextConfig;
