/* eslint-disable */

const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/context"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@views": path.resolve(__dirname, "src/views"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 0,
      maxSize: 256000,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"],
      },
      {
        enforce: "pre",
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "src"),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "eslint-loader",
          options: {
            cache: true,
            emitWarning: true,
            emitError: true,
            failOnError: true,
            quiet: false,
          },
        },
      },
    ],
  },
};
