import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(appDir, "src");

const withMDX = createMDX({});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  webpack(config) {
    config.resolve ??= {};
    config.resolve.alias ??= {};

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": srcDir,
    };

    return config;
  },
};

export default withMDX(nextConfig);
