// React Strict DOM's web compiler. The extractor in each web app's postcss.config reads styles with
// this config, and the TanStack app also compiles with it.
function parseTypeScript() {
  return {
    name: "parse-typescript",
    manipulateOptions(opts, parserOpts) {
      const has = (name) => parserOpts.plugins.some((p) => (Array.isArray(p) ? p[0] : p) === name);
      if (!has("typescript")) parserOpts.plugins.push("typescript");
      if (!/\.[cm]?ts$/.test(opts.filename ?? "") && !has("jsx")) parserOpts.plugins.push("jsx");
    },
  };
}

module.exports = function babelConfig(api) {
  const dev = process.env.NODE_ENV !== "production";
  api.cache.using(() => process.env.NODE_ENV ?? "");
  return {
    plugins: [parseTypeScript],
    presets: [["react-strict-dom/babel-preset", { debug: dev, dev, platform: "web" }]],
  };
};
