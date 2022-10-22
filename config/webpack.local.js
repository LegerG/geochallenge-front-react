const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

module.exports = merge(common, {
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "..", "public"),
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
  },
});
