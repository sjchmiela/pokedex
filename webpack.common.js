/* eslint-env node */

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    path: path.resolve(__dirname, "priv/static/js"),
  },
  plugins: [
    new CleanWebpackPlugin(["priv/static"]),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
      chunkFilename: "../css/[id].css",
    }),
  ],
  resolve: {
    extensions: [".graphql.js", ".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 30000,
            name: "[name]-[hash].[ext]",
          },
        },
      },
    ],
  },
};
