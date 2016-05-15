module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.sass'],
    modulesDirectories: ['client', 'node_modules']
  },
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
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
