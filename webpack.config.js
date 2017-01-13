var path = require('path');

module.exports = {
  context: __dirname,
  entry: ['./src/app.js'],
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    mainFiles: ['index'],
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'eval-source-map'
};