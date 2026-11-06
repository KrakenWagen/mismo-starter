// The routes, defined once. Each app writes them for its own router when it builds.
import { defineRoutes } from "@mismo/core/config";
import { expo } from "@mismo/expo";
import { next } from "@mismo/next";
import { tanstack } from "@mismo/tanstack";

export default defineRoutes({
  source: "./routes",
  input: expo.input(),
  validFor: [expo, next, tanstack],
  types: {
    shared: "./src/routes.gen.ts",
    web: "./src/routes.web.gen.ts",
    native: "./src/routes.native.gen.ts",
  },
});
