const path = require('path')
const webpack = require('webpack')

const port = 31410;
const url = "http://localhost:" + port;

module.exports = {
  entry: [
    'babel-polyfill',
    './src/entry.jsx'
  ],
  output: {
    path: path.join(__dirname, '../client_bundle/public'),
    filename: 'bundle.js',
    publicPath: 'public'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'SERVICE_URL': JSON.stringify(url)
      }
    })
  ],
  module: {
    rules: [
      { test: /\.(js|jsx)/, loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        query: { presets: ['react'] } // Still unfamiliar with the query instruction
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss&/, loaders: ["style-loader", "css-loader", "sass-loader"] },
      { test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ],
  }
}
