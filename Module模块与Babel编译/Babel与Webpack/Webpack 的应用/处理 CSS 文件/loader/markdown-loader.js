const marked = require('marked')
const { getOptions } = require('loader-utils')

// loader的本质是一个ESM模块，导出一个函数，在函数中对打包资源进行处理
// 导出函数 (建议使用普通函数)，返回值就是处理后的资源，如果loader是最后一个loader，必须返回js代码
// 如果不是最后一个loader，可以不用返回js代码
module.exports = function(source) {
  // 获取 loader 的配置项
  const options = getOptions(this)  // this 就是 loader 的上下文对象
  console.log('my loader', options)

  // return 'my loader' // 这样写会报错，因为返回的是字符串，而不是 JS 代码

  // return 'console.log("my loader")'  // 这样写是可以的，因为返回的是 JS 代码

  const html = marked(source) // 将 markdown 转换为 html

  // "<h1 id="关于">关于</h1><p>我是张三</p>"
  // 直接返回，可能因为引号的问题，导致报错
  // return `module.exports = "${html}"`

  console.log('my loader', html); // <h1 id="关于">关于</h1><p>我是张三</p>
  console.log('my loader', JSON.stringify(html)); // "<h1 id=\"关于\">关于</h1><p>我是张三</p>"

  // return `module.exports = ${JSON.stringify(html)}`

  // 直接返回 html，交给下一个 loader 进行处理（如果这个loader不是最后一个loader，可以不用返回js代码）
  return html
}

