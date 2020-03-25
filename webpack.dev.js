/* eslint-disable */

const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const merge = require("webpack-merge");
const common = require("./webpack.common");

const cacheDir = path.resolve(__dirname, "node_modules", ".cache");

function getThreadLoader(name) {
  return {
    loader: "thread-loader",
    options: {
      workerParallelJobs: 50,
      poolRespawn: false,
      name,
    },
  };
}

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(cacheDir, "css"),
            },
          },
          getThreadLoader("css"),
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(cacheDir, "sass"),
            },
          },
          getThreadLoader("sass"),
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(cacheDir, "js"),
            },
          },
          getThreadLoader("js"),
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: path.resolve(cacheDir, "babel"),
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    publicPath: "/",
    compress: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: 3000,
    open: true,
    disableHostCheck: true,
    hot: true,
  },
});
