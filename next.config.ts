import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Reduce TBT: tree-shake imports de librerías grandes (menos JS en el main thread)
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

export default nextConfig;
