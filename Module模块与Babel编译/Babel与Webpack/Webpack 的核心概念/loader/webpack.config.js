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
        test: /\.js$/,  // 匹配js文件，使用正则表达式，$表示以.js结尾，^表示以.js开头，\.表示匹配.字符
        exclude: /node_modules/,  // 排除node_modules文件夹
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // 按需加载
                  useBuiltIns: 'usage',
                  // core-js 的版本
                  corejs: 3,
                  // targets: "defaults" 
                  // 指定兼容浏览器的版本
                  targets: {
                    chrome: '58',
                    ie: '9',
                    firefox: '60',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

/**
 *  "@babel/core"的作用是提供一系列api，用于编译代码
    "@babel/preset-env"的作用是根据配置的目标浏览器或者运行环境，自动将es6+的代码转换为es5
    "babel-loader"的作用是让webpack能够识别并使用babel进行编译
    "core-js"的作用是提供es6+的polyfill，让低版本浏览器也能支持es6+的新特性
 */
