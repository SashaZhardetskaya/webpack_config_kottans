const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: './src/feed/index.js',
  output: {
    path: path.resolve(__dirname, 'public', 'feed'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          },
        })
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
  plugins: []
};

if (isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin('feed.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]);
} else {
  config.plugins = config.plugins.concat([
    new ExtractTextPlugin({
      filename: 'feed.css',
      disable: true,
    }),
  ]);
}

module.exports = config;