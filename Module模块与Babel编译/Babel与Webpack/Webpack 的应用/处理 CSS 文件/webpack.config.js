const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');  // 引入stylelint-webpack-plugin插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //  引入optimize-css-assets-webpack-plugin插件
const ESLintPlugin = require('eslint-webpack-plugin')

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
        test: /\.css$/i,
        // use 中 loader 的加载顺序：先下后上
        use: [
          // 3. 将 JS 中的样式，挂载到 <style> 标签中
          // 'style-loader',

          // 3. 将 CSS 打包到独立的文件中
          // MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../' // 解决css文件中引入图片路径错误的问题,在url前面加上../，因为使用了MiniCssExtractPlugin.loader，将CSS文件打包到独立的文件中
            }
          },

          // 2. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          'css-loader',

          // 1. 通过 postcss-loader 给样式属性添加浏览器前缀
          'postcss-loader'
        ]
      },

      {
        test: /\.less$/i, // 匹配所有以.css结尾的文件
        // loader: 'css-loader' // 使用css-loader处理.css文件，css-loader会将CSS文件转换为JS模块，以便在JS中引入CSS文件
        // use: ['style-loader', 'css-loader']  // 使用多个loader，从右向左执行, style-loader用于将样式通过<style>标签内联到HTML中
        use: [
          // 4. 将 CSS 打包到独立的文件中
          // MiniCssExtractPlugin.loader, // 使用MiniCssExtractPlugin.loader替换style-loader,变成外联样式
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },

          // 3. css-loader 按照 CommonJS 规范，将样式文件，输出到 JS 中
          'css-loader',

          // 2. 通过 postcss-loader 给样式属性添加浏览器前缀，autoprefixer的作用是根据设置的浏览器版本自动处理浏览器前缀
          'postcss-loader', // 使用postcss-loader处理CSS文件，postcss-loader会调用PostCSS插件处理CSS文件，结合autoprefixer插件给CSS属性添加浏览器前缀

          // 1. less-loader 将 Less 文件编译为 CSS 文件
          'less-loader' // 使用less-loader处理.less文件，less-loader会将less文件转换为css文件(安装less和less-loader)
        ]
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                // 下面的写法，也可以单独放在.babelrc文件中
                '@babel/preset-env',
                {
                  // 按需加载，根据代码中使用的新特性，只需要加载相关的polyfill
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
      },

      // 处理图片，url-loader 依赖 file-loader，file-loader是按需加载的
      {
        test: /\.(png|gif|jpe?g)$/i,
        use: {
          loader: "url-loader",
          options: {
            // 指定图片大小，小于该数值的图片，会被转成 base64
            // 8kb,表示小于3kb的图片会被转为base64，并直接嵌入到最终的bundle文件中,大于3kb的则会按照file-loader的方式进行打包
            limit: 0 * 1024, // 8 kb
            // [name] 是图片原来的名称
            // [ext] 是图片原来的后缀名
            name: "image/[name].[ext]",
            // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
            // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
            esModule: false
          }
        }
      },

      {
        test: /\.(htm|html)$/i,
        use: {
          // html-loader的作用是处理HTML文件中的图片路径，将HTML文件中的图片路径替换为打包后的路径，提示就是一个string替换功能
          // 将HTML文件中的图片路径替换为打包后的路径，使用url-loader来加载图片，但是url-loader默认使用ES Module语法解析文件路径，
          // 而html-loader引入图片是CommonJS语法，所以需要关闭url-loader的ES Module语法
          loader: 'html-loader',  
          options: {
            // Webpack 4 中只需要在 url-loader 配置 esModule: false
            // Webpack 5 需要 html-loader 中，也配置 esModule: false
            esModule: false
          }
        }
      },
    ]
  },


  plugins: [
    // 生成一个HTML文件，并自动引入打包后的JS和CSS文件
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'  // 生成的HTML文件名，位置默认在output.path中
    }),
    // 实例化插件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'  // 将CSS文件输出到css文件夹,并以[name].css命名,如果没有指定entry中的key,则默认为main.css
    }),
    new StylelintPlugin({
      // 指定需要进行格式校验的文件
      files: ['src/*.{css,less,sass,scss}']
    }),
    new OptimizeCssAssetsPlugin(), // 压缩CSS文件
    new ESLintPlugin({
      // 自动解决常规的代码格式报错
      fix: true
    })
  ]
};
// 在Webpack中，loader和plugin都是用来扩展Webpack功能的，但它们的工作方式和使用场景有所不同。
// Loader：主要用于转换应用程序的源代码。Webpack本身只能处理JavaScript，但是loader可以将其他类型的文件转换为有效的模块，然后可以添加到依赖图中。
// 例如，babel-loader可以将ES6代码转换为ES5代码，css-loader可以将CSS转换为JavaScript模块。
// Plugin：用于执行范围更广的任务。插件的范围包括从打包优化和压缩，到重新定义环境中的变量。插件接口可以用来处理各种各样的任务。
// 总结一下，loader主要用于加载和转换文件，而plugin则用于执行各种各样的任务，包括打包优化、资源管理和环境变量注入等。

/**
 * css-loader的作用是用来处理css文件，将css文件转换为js模块，以便在js中引入css文件。
 * 如果不使用css-loader，webpack默认只能处理js文件，无法识别css文件，所以需要使用css-loader来处理css文件。
 * 那css-loader是如何将css文件转换为js模块的呢？css-loader内部实现了css文件的解析，将css文件解析为js对象，然后通过js对象的方式引入css文件。
 * 原始CSS文件：styles.css
 *  .title {
 *  color: red;
 * }
 * 
 * .content {
 *  color: blue;
 * }
 * 使用css-loader处理后的JavaScript模块：
 * module.exports = [
 *  [module.id, 
 *   ".title { color: red; }
 *   .content { color: blue; }", ""]
 * ];
 * 
 * import styles from './styles.css';
 * 在JavaScript文件中导入styles.css时，实际上是导入了由css-loader转换后的JavaScript模块。
 * 这使得开发者可以在JavaScript中直接使用CSS样式，而Webpack会负责将这些样式应用到最终的页面上。
 */


/**
 * "stylelint"的作用是用来检查CSS文件中的语法错误和风格错误，以确保CSS文件的质量。
   "stylelint-config-standard"的作用是提供了一套标准的CSS代码规范，可以帮助开发者编写出高质量的CSS代码。
   "stylelint-webpack-plugin"的作用是将"stylelint"集成到Webpack中，可以在Webpack构建过程中自动检查CSS文件。
 */