const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = {
   entry: './client/main.js',
   output: {
     path: path.resolve(__dirname, 'build'),
     filename: 'main.bundle.js'
   },
   module: {
     loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
             presets: ['env']
         }
       }
     ]
   },
   stats: {
       colors: true
   },
   devtool: 'source-map',
   plugins: [
    new CopyWebpackPlugin([
      {
        from: 'client/index.html',
        to: 'index.html'
      },
      {
        from: 'node_modules/socket.io-client/dist/socket.io.js',
        to: 'socket.io.js'
      }
    ])
   ],
   devServer: {
     proxy: {
       '/api': {
         target: 'http://localhost:3000',
         secure: false
       }
     }
   }
};
