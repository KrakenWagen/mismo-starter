import { withMismo } from "@mismo/next/config";
import { withUI } from "@mismo/ui/next";
import type { NextConfig } from "next";

const config: NextConfig = {
  // Keeps the dev badge away from the sidebar's links.
  devIndicators: { position: "bottom-right" },
  // The shared screens are TypeScript source in another package.
  transpilePackages: ["@acme/app", "@mismo/core", "@mismo/next"],
};

export default withMismo(withUI(config), {
  config: "../../packages/app/routes.config.ts",
  outDir: "app",
  types: "app/routes.gen.ts",
});
