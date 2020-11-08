const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const fileListTxtWebpackPlugin = require("./myPlugins/fileList-txt-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/index.js",
    list: "./src/list.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            publicPath: "../images",
            limit: 1024 * 3, //阈值 超过阈值的图片会独立文件，没有超过会处理成base64
          },
        },
      },
      {
        test: /\.(eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../",
          },
        },
      },
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  devtool: "inline-source-map", //source-map inline-source-map cheap-source-map
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      template: "./src/list.html",
      filename: "list.html",
      chunks: ["list"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new fileListTxtWebpackPlugin({
      name: 'fileList'
    }),
    new CleanWebpackPlugin(),
  ],
};
