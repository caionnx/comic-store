const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack')

require('dotenv').config({ path: '.env.development' })

module.exports = (env) => {
  return {
    mode: 'development',
    entry: ['babel-polyfill', './resources/app.js'],
    output: {
      path: path.join(__dirname, 'public', 'assets'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.css|\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "stylus-loader"
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css"
      }),
      new webpack.DefinePlugin({
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
      })
    ],
    devtool: 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/assets'
    }
  }
}
