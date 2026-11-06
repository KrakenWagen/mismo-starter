const { getDefaultConfig } = require("expo/metro-config");
const { withMismo } = require("@mismo/expo/metro");

module.exports = withMismo(getDefaultConfig(__dirname), {
  config: "../../packages/app/routes.config.ts",
  outDir: "src/app",
  types: "src/routes.gen.ts",
  cwd: __dirname,
});
