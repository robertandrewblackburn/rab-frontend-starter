const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = (env, argv) => {
  // check what mode we're running in
  const WEBPACK_MODE = argv.mode;

  // javascript loader
  const javascript = {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: { presets: ['env'] }
    }
  };

  // sass/css loader
  const styles = {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: WEBPACK_MODE === 'production'
        }
      },
      {
        loader: 'postcss-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  };

  // config object
  const config = {
    entry: {
      main: './src/js/main.js'
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'js'),
      filename: '[name].js',
    },
    module: {
      rules: [javascript, styles]
    },
    plugins: [
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['./'] }
      }),
      new MiniCssExtractPlugin({
        filename: '../css/[name].css'
      })
    ]
  }

  return config;
}
