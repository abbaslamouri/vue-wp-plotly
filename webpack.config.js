const webpack = require('webpack')
const path = require("path");

  new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: false,
        __VUE_PROD_DEVTOOLS__: false,
      })



const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  // mode: "none",
  mode: "development",
  // mode: "production",


  entry: {
    admin: "./src/js/admin.js",
    frontend: "./src/js/frontend.js"
  }, 

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/wp-admin/admin.php?page=yrl_wp_vue_plotly_charts/'
  },

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
          },
        },
      },
    ],
  },

  plugins: [

    // Extract css into a seperate file
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    // Clean dist folder
    new CleanWebpackPlugin(),

    new VueLoaderPlugin(),

    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),



  ],
};
