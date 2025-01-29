const CracoWebpackPlugin = require("craco-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Modify the Webpack config here, e.g., adding fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
        url: require.resolve("url/"),
        util: require.resolve("util/"),
        buffer: require.resolve("buffer/"),
      };
      return webpackConfig;
    },
  },
};
