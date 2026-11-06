// Compiles React Strict DOM's styles to class names, then hands over to Next.js's own preset.
module.exports = function babelConfig(api) {
  const dev = process.env.NODE_ENV !== "production";
  api.cache.using(() => process.env.NODE_ENV ?? "");
  return {
    presets: ["next/babel", ["react-strict-dom/babel-preset", { debug: dev, dev, platform: "web" }]],
  };
};
