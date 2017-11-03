const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('style.css');

const config = {
  entry : './src/index.jsx',
  output : {
    filename : 'bundle.js',
    path : path.resolve(__dirname, 'build'),
    publicPath : 'build/'
  },
  module : {
    rules :[
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        include : /src/,
        use : {
          loader : 'babel-loader'
        }
      },
      { 
        test : /\.css$/,
        use : extractCSS.extract(['css-loader']) 
        //loaders : ['style-loader', 'css-loader'] These loaders are applied from right to left
      },
      {
        test : /\.(jpe?g|png|gif|svg)$/,
        use : [
          {
            loader : 'url-loader',
            options : { limit : 40000 }
          },
          'image-webpack-loader'
        ]
      }
    ]
  },
  plugins : [
    extractCSS
  ]
};

module.exports = config;