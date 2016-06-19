var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
  entry: [
    'babel-polyfill',
    './client/index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:       JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      // JAVASCRIPT
      {
        test:     /\.jsx?$/,
        loader:   'babel',
        exclude:  /node_modules/,
        include:  /(client|common)/
      },
      // SASS
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      }
    ]
  },

  postcss: function () {
    return [autoprefixer];
  },


  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
    modulesDirectories: ['client', 'node_modules']
  }
}
