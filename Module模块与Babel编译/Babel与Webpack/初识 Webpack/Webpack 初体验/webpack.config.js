const path = require('path'); // 不要使用ES6的语言，引入node.js的path模块，这样webpack.config.js文件就可以在node.js环境下

module.exports = {
  mode: 'development',  // 开发模式
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
