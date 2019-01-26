const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const distPath = path.join(__dirname, "/public");

const config = {
  entry: {
    main: "./src/js/index.js"
  },
  output: {
    filename: "bundle.js",
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new CopyWebpackPlugin([
      {
        from: "src/assets",
        to: "images"
      }
    ])
  ],
  devServer: {
    contentBase: distPath,
    port: 8000
  }
};

module.exports = config;
