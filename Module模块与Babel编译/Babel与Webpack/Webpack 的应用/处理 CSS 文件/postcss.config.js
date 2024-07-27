module.exports = {
  'plugins': [
    require('autoprefixer')
  ]
}

// 配置文件的作用是告诉 postcss-loader 使用哪些插件处理 CSS 文件，这里只使用了一个 autoprefixer 插件，
// 它的作用是根据设置的浏览器版本自动处理浏览器前缀。还需要在 package.json 中配置 browserslist，指定需要兼容的浏览器版本。