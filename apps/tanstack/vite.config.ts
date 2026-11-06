import { mismo } from "@mismo/core/vite";
import { tanstack } from "@mismo/tanstack";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  ssr: {
    // Shared screens are source code in another package, so the server build bundles them.
    noExternal: ["@acme/app", "@mismo/core", "@mismo/tanstack", "react-strict-dom"],
  },
  plugins: [
    // Before TanStack Start: writes the shared routes into src/routes.
    mismo({
      config: "../../packages/app/routes.config.ts",
      output: tanstack.output({ outDir: "src/routes", types: "src/routes.gen.ts" }),
    }),
    // React Strict DOM's compiler, for this app, the shared screens and the library itself.
    babel({
      include: [/[\\/]apps[\\/]tanstack[\\/]src[\\/].*\.[jt]sx?(\?|$)/, /[\\/]packages[\\/]app[\\/].*\.[jt]sx?(\?|$)/, /[\\/]react-strict-dom[\\/].*\.js(\?|$)/],
      optimizeOnSSR: true,
    }),
    tanstackStart(),
    react(),
  ],
});
