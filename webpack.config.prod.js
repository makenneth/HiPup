var webpack = require("webpack");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: "./frontend/hipUp.jsx",
  output: {
    path: path.resolve(__dirname, 'src', 'app.js'),
    filename: 'bundle.js'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
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
        loaders: ['style-loader', 'css-loader', 'sass-loader']
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
    extensions: ['', '.js', '.jsx']
  },
};
