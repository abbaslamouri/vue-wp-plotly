const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // mode: "none",
  mode: "development",
  // mode: "production",


  entry: {
    admin: "./assets/js/admin.js",
    frontend: "./assets/js/frontend.js"
  }, 

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "assets/bundle"),
    // publicPath: ''
  },

  devtool: "inline-source-map",

  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   //index: index.html,
  //   port: 9000
  // },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
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
      // {
      //   test: /\.js$/,
      //   loader: 'ify-loader'
      // }
    ],
  },

  plugins: [
    // Extract css into a seperate file
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),

    // Clean dist folder
    new CleanWebpackPlugin(),
  ],
};
