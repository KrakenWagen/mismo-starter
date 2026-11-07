import { mismo } from "@mismo/core/vite";
import { tanstack } from "@mismo/tanstack";
import { ui } from "@mismo/ui/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  ssr: {
    // Shared screens are source code in another package, so the server build bundles them.
    noExternal: ["@acme/app", "@mismo/core", "@mismo/tanstack"],
  },
  plugins: [
    // Before TanStack Start: writes the shared routes into src/routes.
    mismo({
      config: "../../packages/app/routes.config.ts",
      output: tanstack.output({ outDir: "src/routes", types: "src/routes.gen.ts" }),
    }),
    ui(),
    tanstackStart(),
    react(),
  ],
});
