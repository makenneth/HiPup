var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  plugins:[
    new CleanPlugin(['./public/assets'], { root: __dirname }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      sourceMap: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?-autoprefixer!postcss-loader!sass-loader'
        )
      },
      {
        test: /\.png$/,
        loader: 'url',
        query: {
          limit: '10000',
          mimetype: 'application/png'
        }
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
    extensions: ['', '.js', '.jsx'],
    alias: {
      assets: path.resolve(__dirname, 'src/assets')
    }
  },
  postcss: [ autoprefixer({ browserslist: ['> 5%', 'last 2 versions'] }) ]
};
