const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/feed/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'feed'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', {
                targets: {
                  browsers: ['last 2 versions', 'ie >= 11']
                }
              }]],
              plugins: ['lodash']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}