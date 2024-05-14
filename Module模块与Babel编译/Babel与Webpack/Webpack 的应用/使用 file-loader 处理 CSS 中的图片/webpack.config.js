const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      // 处理 CSS 文件
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, 
            options: {
              publicPath: '../' // 解决css文件中引入图片路径错误的问题,在url前面加上../
            }
          },
          'css-loader'
        ]
      },
      // 处理图片文件,把图片文件输出到img文件夹
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'  // 输出到img文件夹,并以原文件名命名
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};
