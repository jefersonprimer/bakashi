import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Adicione os domínios permitidos para carregar imagens
  },
};

export default nextConfig;
