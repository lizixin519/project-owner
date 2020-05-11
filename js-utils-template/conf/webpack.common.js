module.exports = {
  entry: {
    index: './index.js'
  },
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}