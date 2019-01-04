const path = require('path');

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, 'app/client/index.js')],
  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'app.bundled.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader'
      }
    ]
  }
}

module.exports = config;