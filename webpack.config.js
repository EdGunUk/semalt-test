"use strict";

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const conf = {
  entry: "./src/js/main.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    contentBase: "./dist",
    overlay: true,
  },
  module: {
    rules: [
      {
        test: /\.(html)$/, 
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
          // use one tincture MiniCssExtractPlugin.loader of "style-loader" 
          MiniCssExtractPlugin.loader,    //for CSS in external file
          // "style-loader",              //for CSS to tad style
          "css-loader"
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "img",
          esModule: false,
        },
      },
      {
        test: /\.svg$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "svg",
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "font",
          esModule: false,
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
    // new HtmlWebpackPlugin({
    //   filename: "test.html",
    //   template: "src/test.html",
    // }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = function(env, options) {
  const htmlMinify = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  };

  if(options.mode === "production") {
    conf.devtool = false;
    conf.plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/index.html",
        minify: htmlMinify
      }),
      // new HtmlWebpackPlugin({
      //   filename: "test.html",
      //   template: "src/test.html",
      //   minify: htmlMinify
      // }), 
      new MiniCssExtractPlugin(),
      new OptimizeCssAssetsPlugin({})
    ];
  }
  return conf;
};

