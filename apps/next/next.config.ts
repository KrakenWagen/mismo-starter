import { withMismo } from "@mismo/next/config";
import type { NextConfig } from "next";

const config: NextConfig = {
  // The shared screens are TypeScript source in another package.
  transpilePackages: ["@acme/app", "@mismo/core", "@mismo/next", "react-strict-dom"],
};

export default withMismo(config, {
  config: "../../packages/app/routes.config.ts",
  outDir: "app",
  types: "app/routes.gen.ts",
});
