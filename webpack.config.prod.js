/*
eslint-disable
 */
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractLESS = new ExtractTextPlugin('style/[name]__[contenthash].css');

module.exports = {
  entry: {
    index: [
      './src/index.jsx',
      // 入口文件
    ],
    vendors: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: __dirname + '/dist/',
    filename: 'js/[name]__[chunkHash:8].js',
    chunkFilename: "js/[name]__[chunkHash:5]_chunk.js",
    publicPath: '/dist',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, {
      test: /\.less$/,
      use: extractLESS.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      }),
    }, {
      test: /\.(png|jpe?g|gif)(\?.+)?$/,
      loader: 'url-loader?name=image/[name].[hash:12].[ext]&limit=10000',
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)(\?.+)?$/,
      loader: 'file-loader?name=font/[name].[hash:12].[ext]',
    }],
  },
  plugins: [
    extractLESS,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'js/common.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 3,
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlwebpackPlugin({
      template: './src/index_tpl.pug',
      filename: 'index.pug',
      inject: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
      sourceMap: true
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: 'source-map',
};
