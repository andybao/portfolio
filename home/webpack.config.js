'use strict';
var webpack = require('webpack');
var path = require('path');

// Builds bundle usable inside <script>.
module.exports = {
    devtool: 'source-map',
  context: __dirname,
  entry: {
    'app': './app.js'
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    libraryTarget: "umd",
    library: "app",
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
          loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist',
    compress: true,
    port: 4003,
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ],
  resolve: {
  }
};
