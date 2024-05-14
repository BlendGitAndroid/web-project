const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入 html-webpack-plugin

module.exports = {
  mode: 'development',
  // entry: {
  //   index: './src/index.js'
  // },
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },

  // 配置插件，是一个数组
  plugins: [
    // 单入口
    // new HtmlWebpackPlugin({
    //   template: './index.html'
    // })

    // 多入口，实例化多个 HtmlWebpackPlugin 实例
    new HtmlWebpackPlugin({
      template: './index.html', // 模板文件
      filename: 'index.html', // 输出的文件名
      chunks: ['index'],  // 与入口文件对应的模块名
      // 压缩 index.html
      minify: {
        // 删除 index.html 中的注释
        removeComments: true,
        // 删除 index.html 中的空格
        collapseWhitespace: true,
        // 删除各种 html 标签属性值的双引号
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      template: './search.html',
      filename: 'search.html',
      chunks: ['search']
    })
  ]
};
