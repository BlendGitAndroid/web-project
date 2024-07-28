const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');  // 引入stylelint-webpack-plugin插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin') //  引入optimize-css-assets-webpack-plugin插件
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')  // 不需要处理的其他文件，可以直接复制到输出目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MyPlugin = require('./plugin/MyPlugin') // 引入自定义插件
const TerserPlugin = require("terser-webpack-plugin");


// 导出一个箭头函数
module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    // entry: './src/index.js',

    // 1. 代码分离，多入口打包
    entry: {
      index: './src/index.js',
      about: './src/about.js'
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js' // 输出文件名为[name].js,如果没有指定entry中的key,则默认为main.js
    },

    // devtool默认值在生产环境下，也就是mode为production，值是false。在开发环境下也就是mode为development，值是eval。
    // Tree Shaking 仅支持 source-map | inline-source-map | hidden-source-map | nosources-source-map
    devtool: 'source-map',

    // 优化策略
    optimization: {


      // Tree Shaking依赖于ES6模块化的静态引入方式，生产模式下默认开启
      // Tree Shaking与Source Map存在兼容性问题，只支持souce-map/inline-source-map/hidden-source-map/nosources-source-map
      // eval模式将js输出为eval包裹的字符串，不支持Tree Shaking
      // Tree Shaking 1. optimization.usedExports方法
      // 标记未被使用的代码
      // usedExports: true,
      // // 删除usedExports标记的未被使用的代码，并且代码会被压缩
      // minimize: true,
      // minimizer: [new TerserPlugin()],

      // Tree Shaking 2. optimization.sideEffets方法
      // 把未使用但无副作用的代码删除
      // 如果有副作用的代码，需要在package.json中配置"sideEffects"
      // sideEffets: true,

      // 2. 代码分离，优化策略，提取公共代码
      splitChunks: {
        chunks: 'all'
      }
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
                // 为什么要加上publicPath？
                // 因为 MiniCssExtractPlugin.loader 会将css都统一打包到css文件夹下
                // 而图片文件是通过url-loader打包的，都会统一打包到image文件夹下，
                // 在css文件夹下使用image的东西，需要引入...
                publicPath: '../'
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
          // use: {
          //   loader: "url-loader",
          //   options: {
          //     // 指定图片大小，小于该数值的图片，会被转成 base64
          //     // 8kb,表示小于3kb的图片会被转为base64，并直接嵌入到最终的bundle文件中,大于3kb的则会按照file-loader的方式进行打包
          //     limit: 0 * 1024, // 8 kb
          //     // [name] 是图片原来的名称
          //     // [ext] 是图片原来的后缀名
          //     name: "image/[name].[ext]",
          //     // url-loader 默认采用 ES Modules 规范进行解析，但是 html-loader 引入图片使用的是 CommonJS 规范
          //     // 解决：关闭 url-loader 默认的 ES Modules 规范，强制 url-loader 使用 CommonJS 规范进行打包
          //     esModule: false
          //   }
          // }

          // 上面是webpack4的写法，webpack5的写法如下

          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: "image/[name][ext]"
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

        // 匹配字体文件
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          // use: {
          //   loader: 'file-loader',  // 使用file-loader处理字体文件
          //   options: {
          //     name: 'fonts/[name].[ext]'  // 输出到fonts文件夹
          //   }
          // }

          // 使用资源模块处理字体文件
          // asset 可以在 asset/resource 和 asset/inline 之间进行选择
          // 如果文件小于 8kb，则使用 asset/inline 类型
          // 如果文件大于 8kb，则使用 asset/resource 类型
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024
            }
          },
          generator: {
            filename: "fonts/[name][ext]"
          }
        },

        // 使用自定义loader处理markdown文件
        {
          test: /\.md$/i,
          // use: './loader/markdown-loader',
          use: [
            'html-loader',
            // './loader/markdown-loader'
            {
              loader: './loader/markdown-loader', // 先使用markdown-loader处理markdown文件，将markdown文件转换为html文件，然后再使用html-loader处理html文件
              options: {
                size: 20
              }
            }
          ]
        },
      ]
    },

    // 开发服务器，默认加载的是内存的数据
    // webpack4: webpack-dev-server
    // webpack5: webpack serve
    devServer: {
      // 指定加载内容的路径，就是打包后的文件
      contentBase: path.resolve(__dirname, 'dist'),

      // 启用 gzip 压缩
      compress: true,

      // 端口号
      port: 9200,

      // 启动自动更新（禁用 hot）
      liveReload: true,

      // 配置代理：解决接口跨域问题
      proxy: {
        // 下面的配置就是说，当请求 /api 时，会将请求转发到 https://api.github.com/api
        // 配置pathRewrite 为 /api，是为了将 /api 替换为空，这样请求 /api/users 就会转发到 https://api.github.com/users
        // http://localhost:9200/api
        '/api': {
          // http://localhost:9200/api/users => https://api.github.com/api/users
          target: 'https://api.github.com',
          // http://localhost:9200/api/users => https://api.github.com/users
          pathRewrite: {
            '^/api': "" // 将 /api 替换为空
          },
          // 不能使用 localhost:9200 作为 github 的主机名
          changeOrigin: true
        }
      }
    },

    // 配置目标
    target: "web",

    plugins: [
      // 生成一个HTML文件，并自动引入打包后的JS和CSS文件
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',  // 生成的HTML文件名，位置默认在output.path中
        // 指定要加载的打包文件，与entry中的key对应，如果不设置chunks，则默认加载所有打包文件
        chunks: ['index']
      }),
      new HtmlWebpackPlugin({
        // 指定打包后的文件名称
        filename: 'about.html',
        // 用来指定，生成 HTML 的模板
        template: './index.html',
        // 指定 HTML 中使用的变量
        title: "关于我们",
        chunks: ['about']
      }),
      // 实例化插件
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'  // 将CSS文件输出到css文件夹,并以[name].css命名,如果没有指定entry中的key,则默认为main.css
      }),
      new StylelintPlugin({
        // 指定需要进行格式校验的文件
        files: ['src/*.{css,less,sass,scss}']
      }),
      // new OptimizeCssAssetsPlugin(), // development不需要压缩CSS文件
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public"
          }
        ]
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin(),

      new MyPlugin({
        target: '.css'
      }),
    ]
  };

  // 判断环境
  if (env.production) {
    config.mode = 'production';

    // webpack4中有13种模式，webpack5中有26种模式
    // 启动SourceMap定位问题
    // config.devtool = 'source-map'; // 生成source-map文件，这只是一种生成source-map的方式，还有其他方式
    // 开发环境下建议使用eva-cheap-module-source-map，打包速度快，定位到行
    // 生产环境下建议使用none|nosources-source-map，不生成source-map文件，保护源码
    // 启用 Source Map 定位问题
    config.devtool = 'nosources-source-map' // 可以定位信息，但是不暴露源码

    config.plugins = [      // 生成一个HTML文件，并自动引入打包后的JS和CSS文件
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',  // 生成的HTML文件名，位置默认在output.path中
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
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
      // new ESLintPlugin({
      //   // 自动解决常规的代码格式报错
      //   fix: true
      // }),
      // 直接将 src 下，不需要特殊处理的文件，直接复制到输出目录中
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/public",
            to: "public"
          }
        ]
      }),

      // 打包之前，先删除历史文件
      new CleanWebpackPlugin()
    ];
  }

  return config;
}


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

/**
 * webpack使用命令行设置环境变量：
 * webpack 4: webpack --env.production
 * webpack 5: webpack --env production
 * 默认是：npm run webpack
 * 设置生产环境：npm run webpack --env production
 */