const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
            esModule: false // 解决HTML中图片路径错误的问题,设置为false,不使用ES6模块语法
          }
        }
      },
      // 处理 HTML 文件中的图片
      {
        test: /\.(htm|html)$/,
        loader: 'html-withimg-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ]
};

/**
 * html-withimg-loader是一个Webpack的加载器（loader），它的主要作用是处理HTML文件中的图片引用。在HTML中直接使用图片路径时，
 * 如果图片资源进行了移动或重命名，那么引用路径也需要相应地手动更改，这样做非常不便且容易出错。使用html-withimg-loader可以自
 * 动处理这些图片资源的引用路径。

具体来说，html-withimg-loader会分析HTML文件中的<img>标签以及CSS中的background-image等引用的图片路径，然后根据Webpack的配置
将这些图片视为模块进行处理。这样做的好处包括：

自动化处理：自动解析和重写图片资源的路径，确保引用正确，减少手动修改路径的工作。
版本控制和缓存优化：通过Webpack处理，可以为图片文件添加hash值，实现版本控制和浏览器缓存优化。
优化打包结果：可以配合其他loader和插件，如file-loader、url-loader等，对图片进行压缩、转换为base64等操作，优化最终的打包结果。
总之，使用html-withimg-loader可以让图片资源的管理变得更加自动化和高效，避免了直接硬编码路径可能带来的问题。

`html-withimg-loader`在Webpack的构建过程中工作，它通过分析HTML文件中的图片引用来找到具体的路径。这个过程大致可以分为以下几个步骤：

1. **解析HTML文件**：当Webpack处理到一个HTML文件时，如果该文件被指定使用`html-withimg-loader`，该loader会解析文件内容，查找所有的图片引用。
这包括`<img>`标签的`src`属性、CSS样式中的`background-image`等。

2. **识别路径**：对于每一个找到的图片引用，`html-withimg-loader`会读取其路径。这个路径可以是相对路径，也可以是绝对路径。

3. **请求解析**：`html-withimg-loader`将这些路径作为请求发送给Webpack。Webpack根据配置，可能会进一步使用其他loader（如`file-loader`或`url-loader`）
来处理这些图片资源。

4. **路径重写**：在图片被相应的loader处理后（例如复制到输出目录、重命名等），`html-withimg-loader`会根据处理结果重写原HTML文件中的图片路径。
如果配置了hash等选项，这些也会被应用到最终的文件名中。

5. **更新HTML文件**：最终，HTML文件中的图片引用会被更新为新的路径，确保在浏览器中可以正确加载图片。

这个过程依赖于Webpack的模块解析机制，通过将图片视为模块的一部分来处理，从而实现对图片路径的动态管理。这样，开发者就不需要手动管理这些资源路径，
也能保证在最终构建的项目中资源引用的正确性。
 */