const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: 'development',
  // Webpack 入口文件
  entry: {
    index: './src/index.js',
    list: './src/list.js'
  },
  // Webpack 输出路径
  output: {
    // 输出的目录
    path: resolve('dist'),
    // 输出的文件名
    filename: 'js/[name].js'
  },
  // source-map，调试用的，出错的时候，将直接定位到原始代码，而不是转换后的代码
  devtool: 'cheap-module-eval-source-map',
  // 不同类型模块的处理规则
  module: {
    rules: [
      // 模板文件
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      }
    ]
  },
  plugins: [
    // 自动将依赖注入 html 模板，并输出最终的 html 文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.art',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'list.html',
      template: './src/list.art',
      chunks: ['list']
    })
  ]
};
