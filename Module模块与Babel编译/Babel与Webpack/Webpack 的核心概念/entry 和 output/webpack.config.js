const path = require('path'); // 引入node.js的path模块

module.exports = {
  mode: 'development',
  // entry: './src/index.js', // 单入口

  // 多入口
  // entry: {
  //   main: './src/index.js',
  //   search: './src/search.js'
  // },

  // 单入口
  // output: {
  //   path: path.resolve(__dirname, 'dist'), // 输出文件的路径，__dirname表示当前文件所在目录，是一个绝对路径，第二个参数是输出文件的目录
  //   filename: 'bundle.js'  // 输出文件的名称
  // }

  // 多入口
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // [name]表示entry的key
  }
};
