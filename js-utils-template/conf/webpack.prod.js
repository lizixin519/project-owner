const merge = require('webpack-merge');
let commonConfig = require('./webpack.common');
const path = require('path');
let TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, '../dist'),
    library: 'dateHelper',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
})