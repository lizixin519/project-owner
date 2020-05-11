const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');
module.exports = merge(commonConfig, {
  output: {
    filename: '[name].js',
    library: 'defalut',
    libraryTarget: 'umd',
    libraryExport: 'default'
  }
})