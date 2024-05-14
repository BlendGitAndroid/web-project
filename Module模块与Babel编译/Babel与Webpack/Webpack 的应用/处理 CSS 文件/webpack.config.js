const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // 输出文件名为[name].js,如果没有指定entry中的key,则默认为main.js
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 匹配所有以.css结尾的文件
        // loader: 'css-loader' // 使用css-loader处理.css文件
        // use: ['style-loader', 'css-loader']  // 使用多个loader，从右向左执行, style-loader用于将样式通过<style>标签内联到HTML中
        use: [MiniCssExtractPlugin.loader, 'css-loader']  // 使用MiniCssExtractPlugin.loader替换style-loader,变成外联样式
      }
    ]
  },
  plugins: [
    // 生成一个HTML文件，并自动引入打包后的JS和CSS文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'  // 将CSS文件输出到css文件夹,并以[name].css命名
    })
  ]
};
// 在Webpack中，loader和plugin都是用来扩展Webpack功能的，但它们的工作方式和使用场景有所不同。
// Loader：主要用于转换应用程序的源代码。Webpack本身只能处理JavaScript，但是loader可以将其他类型的文件转换为有效的模块，然后可以添加到依赖图中。
// 例如，babel-loader可以将ES6代码转换为ES5代码，css-loader可以将CSS转换为JavaScript模块。
// Plugin：用于执行范围更广的任务。插件的范围包括从打包优化和压缩，到重新定义环境中的变量。插件接口可以用来处理各种各样的任务。
// 总结一下，loader主要用于加载和转换文件，而plugin则用于执行各种各样的任务，包括打包优化、资源管理和环境变量注入等。
