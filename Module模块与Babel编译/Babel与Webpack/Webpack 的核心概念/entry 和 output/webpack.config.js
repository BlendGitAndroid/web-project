const path = require('path'); // 引入node.js的path模块

module.exports = {
  mode: 'development',
  // entry: './src/index.js', // 单入口，如果不指定，默认为./src/index.js

  // 多入口
  entry: {
    main: './src/index.js',
    search: './src/search.js'
  },

  // 单输出
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 输出文件的路径，__dirname表示当前文件所在目录，是一个绝对路径，第二个参数是输出文件的目录
  //   filename: 'bundle.js'  // 输出文件的名称
  // }

  // 这里指定了多个输出文件，那么输出文件的名称就不能是固定的了，需要使用占位符来表示
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出文件的路径，__dirname表示当前文件所在目录，是一个绝对路径，第二个参数是输出文件的目录
    filename: '[name].js' // [name]表示entry的key，也就是多入口的key
  }
};

/**
 * 在使用Webpack时，如果某个JavaScript文件没有在entry中指定，那么Webpack默认不会将其编译和打包。Webpack只会处理在entry中明确指定的入口文件
 * 及其依赖的模块。
 * 这意味着Webpack会从./src/index.js和./src/search.js这两个文件开始，递归地解析和打包它们的依赖。如果某个JavaScript文件没有被这两个入口文件
 * 直接或间接引用，并且没有在entry中明确指定，那么它将不会被Webpack处理和打包。如果被递归引用，Webpack会将extra.js视为index.js的依赖，并将其
 * 包含在打包过程中。最终生成的main.bundle.js文件将包含index.js和extra.js的内容。
 */
