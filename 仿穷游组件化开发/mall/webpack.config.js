const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取绝对路径
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  mode: 'development',
  // Webpack 入口文件
  entry: {
    index: './src/pages/index/index.js'
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
  resolve: {
    // 自动补全（可以省略）的扩展名
    // extensions 属性是一个数组，用于配置在导入语句中可以省略的文件扩展名。在这个例子中，.js 扩展名可以被省略。
    // 例如，当你在代码中写 import MyComponent from './MyComponent' 时，Webpack 会尝试查找 ./MyComponent.js 文件。
    extensions: ['.js'],
    // 路径别名,当你在代码中写 import api from 'api' 时，Webpack 会将 api 解析为 src/api 的绝对路径。
    alias: {
      api: resolve('src/api'),
      fonts: resolve('src/assets/fonts'),
      images: resolve('src/assets/images'),
      styles: resolve('src/assets/styles'),
      components: resolve('src/components'),
      pages: resolve('src/pages')
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      // css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // 模板文件
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      // 图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          // 小于 10K 的图片转成 base64 编码的 dataURL 字符串写到代码中
          limit: 10000,
          // 其他的图片转移到
          name: 'images/[name].[ext]',
          esModule: false
        }
      },
      // 字体文件
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  // 这段代码的作用是创建一个HTML文件，这个文件的名称为index.html，并且内容基于./src/pages/index/index.art这个模板文件。
  // 同时，webpack会自动将打包后的JavaScript文件注入到这个HTML文件中。
  plugins: [
    // 自动将依赖注入 html 模板，并输出最终的 html 文件到目标文件夹
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index/index.art'
    })
  ]
};
