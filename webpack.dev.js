var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');


module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client',
    './client/index.jsx'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:       JSON.stringify('development'),
        UNIVERSAL_ENV:  JSON.stringify('client')
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
        include:  /client/,
        query: {
          presets: ['react-hmre'],
        }
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
