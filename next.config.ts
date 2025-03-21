import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['localhost', '*.localhost', '*.saturna19.fr'],
  poweredByHeader: false,
};

export default nextConfig;
