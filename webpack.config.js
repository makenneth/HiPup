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
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
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