const path = require('path');
const argv = require('yargs').argv;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = argv.mode === 'development';
const distPath = path.join(__dirname, '/public');

const config = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: distPath
  },
  module: {
    rules: [ 
    {
        test: /\.html$/,
        use: 'html-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [
        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
      ]
     }, 
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    new CopyWebpackPlugin([{ 
      from: 'src/assets', to: 'images' 
    }])
  ],
  devServer: {
    contentBase: distPath,
    port: 8000,
  }
};

module.exports = config;