const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const fs = require("fs");

const LAYOUT_PAGES = fs
  .readdirSync(path.join(__dirname, "/src/pug/layout/"))
  .filter((fileName) => {
    return fileName.endsWith(".pug");
  });

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.ttf$/,
        use: ["file-loader"],
      },
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    /*new CopyWebpackPlugin({
      patterns: [{ from: "src/fonts", to: "fonts" }],
    }),*/
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    ...LAYOUT_PAGES.map((page) => {
      console.log("________________________");
      console.log(page);
      return new HtmlWebpackPlugin({
        template: path.join(__dirname, `/src/pug/layout/${page}`),
        filename: `./${page.replace(/\.pug/, ".html")}`,
      });
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
