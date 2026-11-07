const { getDefaultConfig } = require("expo/metro-config");
const { withMismo } = require("@mismo/expo/metro");
const { withUI } = require("@mismo/ui/metro");

module.exports = withUI(
  withMismo(getDefaultConfig(__dirname), {
    config: "../../packages/app/routes.config.ts",
    outDir: "src/app",
    types: "src/routes.gen.ts",
    cwd: __dirname,
  }),
  { cssEntryFile: "./src/global.css" },
);
