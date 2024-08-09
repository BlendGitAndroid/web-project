const logger = require("./logger")
const other = require("./other")    // 直接获取到other中定义的函数
const path = require("path")    // 内置模块path
const fs = require("fs")    // 内置模块File System

console.log("---------------global--------------------------")
console.log(global)

console.log(logger.endPoint)

console.log(logger)

console.log(other)

console.log("---------------内置模块--------------------------")
console.log(path.parse(__filename)) // 解析文件路径

const files = fs.readdirSync("./")  // 同步读取当前目录下的文件
console.log(files)  // [ 'index.js', 'logger.js', 'other.js' ]

// 异步读取当前目录下的文件
fs.readdir("./", function (error, files) {
console.log(error) // null | Error {}
console.log(files) // [ 'index.js', 'logger.js', 'other.js' ]
})

/**
 * Node.js 是如何实现模块的，为什么在模块文件内部定义的变量在模块文件外部访问不到?
 * 每一个模块文件中都会有 module 对象和 require 方法，它们是从哪来的？
 * 在模块文件执行之前，模块文件中的代码会被包裹在模块包装函数当中，这样每个模块文件中的代码就
 * 都拥有了自己的作用域，所以在模块外部就不能访问模块内部的成员了。
 * (function(exports, require, module, __filename, __dirname) {
 * // entire module code lives here
 * });
 * 从这个模块包装函数中可以看到，module 和 require 实际上模块内部成员, 不是全局对象 global 下面的属性。
 * __filename：当前模块文件名称。
 * __dirname：当前文件所在路径。
 * exports：引用地址指向了 module.exports 对象，可以理解为是 module.exports 对象的简写形式。
 */