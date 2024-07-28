// 声明自定义插件
class MyPlugin {
  
  constructor(options) {
    console.log('This is my plugin options: ', options)
    this.userOptions = options || {}
  }

  // 插件的本质是其实是利用 webpack 提供的钩子机制，实现对打包过程的干预
  // 必须声明 apply 方法
  apply(compiler) {
    // 在钩子上挂载功能，emit 钩子表示在文件输出到 output 目录之前执行
    compiler.hooks.emit.tap('MyPlugin', compilation => {
      // compilation 是此次打包的上下文
      for (const name in compilation.assets) {
        console.log(name)
        // 针对 css 文件，执行相关操作
        // if (name.endsWith('.css')) {
        if (name.endsWith(this.userOptions.target)) {
          // 获取处理之前的内容
          const contents = compilation.assets[name].source()
          // 将原来的内容，通过正则表达式，删除注释
          const noComments = contents.replace(/\/\*[\s\S]*?\*\//g, '')
          // 将处理后的结果，替换掉
          compilation.assets[name] = {
            source: () => noComments, // 返回处理后的内容
            size: () => noComments.length // 返回处理后的大小
          }
        }
      }
    })
  }
}

module.exports = MyPlugin
