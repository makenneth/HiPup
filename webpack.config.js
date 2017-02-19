var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:4000',
    path.resolve(__dirname, 'src', 'app.js')
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    colors: true,
    stats: 'errors-only',
    contentBase: './static',
    port: 4000
  },
  output: {
    path: './static',
    publicPath: 'http://localhost:4000/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.ttf$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/font-woff'
        }
      },
      { test: /\.eot$/, loader: 'file' },
      {
        test: /\.svg$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'image/svg+xml'
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    mainFiles: ['index'],
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};