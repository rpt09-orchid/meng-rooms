const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: __dirname + '/client',
  entry: './index.js',
  module: {
    test: /\.jsx?$/,
    exclude: /node_modules/
  }
};