module.exports = {
  plugins: {
    "react-strict-dom/postcss-plugin": {
      babelConfig: { configFile: require.resolve("@acme/app/babel-web") },
      include: [
        "../../packages/app/{routes,src}/**/*.{ts,tsx}",
        "node_modules/react-strict-dom/dist/web/**/*.js",
      ],
      useCSSLayers: true,
    },
  },
};
