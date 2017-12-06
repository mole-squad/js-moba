const path = require('path'),
  webpack = require('webpack'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = {
   entry: './client/main.jsx',
   output: {
     path: path.resolve(__dirname, 'build'),
     publicPath: 'http://localhost:8080/',
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
       },
       {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
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
       },
      '/socket.io': {
         target: 'http://localhost:3000/socket.io',
         secure: false
       }
     }
   }
};
