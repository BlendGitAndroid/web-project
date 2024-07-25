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
    // 在 Webpack 中，一个 chunk 通常对应一个输出的 bundle 文件，它是一组模块的集合。Webpack 在构建过程中，
    // 会根据一些规则（如入口点、代码分割、动态导入等）将模块分组到不同的 chunk 中。
    new HtmlWebpackPlugin({
      template: './index.html', // 模板文件
      filename: 'index.html', // 输出的文件名
      chunks: ['index'],  // 与入口文件对应的模块名，chunks是用于多入口文件的，如果是单入口文件，就不需要设置chunks
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

/**
 * 那么 HtmlWebpackPlugin 是如何实现多入口文件的呢？
 * 原因是 HtmlWebpackPlugin 会根据配置的 chunks 生成多个 script 标签，每个 script 标签对应一个入口文件。
 * 例如，上面的配置中，chunks: ['index'] 会生成如下 script 标签：
 * <script src="index.js"></script>
 * 而 chunks: ['search'] 会生成如下 script 标签：
 * <script src="search.js"></script>
 * 即在 index.html 中会引入 index.js，而在 search.html 中会引入 search.js。
 * 这样在写html模板时，就不需要手动引入多个入口文件了。
 */

/**
 * loader和plugin的区别：
 * 1. loader 用于对模块的源代码进行转换，loader 可以使你在 import 或"加载"模块时预处理文件。
 *    plugin 用于执行范围更广的任务，包括打包优化、资源管理、注入环境变量等。
 * 2. loader 是一个转换器，将 A 文件进行编译形成 B 文件，本质是文件加载器，它作用于一个个文件上。
 *    plugin 是一个扩展器，它丰富了 Webpack 本身，针对的是整个构建过程。 以HtmlWebpackPlugin为例，
 *   它可以在打包结束后，自动生成一个 html 文件，并把打包生成的 js 文件自动引入到这个 html 文件中。
 * 3. loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。
 *    plugin 在 plugins 中单独配置，类型为数组。
 */