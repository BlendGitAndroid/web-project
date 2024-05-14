const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  // 配置loader,这里是配置babel-loader
  module: {
    // rules是一个数组，里面存放的是一个个的规则
    rules: [
      {
        test: /\.js$/,  // 匹配js文件
        exclude: /node_modules/,  // 排除node_modules文件夹
        loader: 'babel-loader'  // 使用babel-loader
      }
    ]
  }
};
