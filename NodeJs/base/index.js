const logger = require("./logger")
const other = require("./other")    // 直接获取到other中定义的函数
const path = require("path")    // 内置模块path
const fs = require("fs")    // 核心模块,也叫做内置模块,File System

console.log("---------------global--------------------------")
console.log(global)

console.log(logger.endPoint)

console.log(logger)

console.log(other)

other("hello world")

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
 *
 * require 本质上就是一个函数，那么函数可以在任意上下文中执行，来自由地加载其他模块的属性方法。
 *
 * require 加载顺序:
 * 1. 首先像 fs ，http ，path 等标识符，会被作为 nodejs 的核心模块。
 *    核心模块的优先级仅次于缓存加载，在 Node 源码编译中，已被编译成二进制代码，所以加载核心模块，加载过程中速度最快。
 * 2. ./ 和 ../ 作为相对路径的文件模块， / 作为绝对路径的文件模块。
 *   以 ./ ，../ 和 / 开始的标识符，会被当作文件模块处理。require() 方法会将路径转换成真实路径，
 *   并以真实路径作为索引，将编译后的结果缓存起来，第二次加载的时候会更快。
 * 3. 非路径形式也非核心模块的模块，将作为自定义模块。
 *   自定义模块，一般指的是非核心的模块，它可能是一个文件或者一个包，它的查找会遵循以下原则：
 *   在当前目录下的 node_modules 目录查找。
 *   如果没有，在父级目录的 node_modules 查找，如果没有在父级目录的父级目录的 node_modules 中查找。
 *   沿着路径向上递归，直到根目录下的 node_modules 目录。
 *   在查找过程中，会找 package.json 下 main 属性指向的文件，
 *   如果没有  package.json ，在 node 环境下会以此查找 index.js ，index.json ，index.node。
 *
 * require 加载原理
 *   首先为了弄清楚上述两个问题。我们要明白两个感念，那就是 module 和 Module。
 *   1. module ：在 Node 中每一个 js 文件都是一个 module ，module 上保存了 exports 等信息之外，还有一个 loaded
 *   表示该模块是否被加载。
 *   为 false 表示还没有加载；
 *   为 true 表示已经加载
 *   2. Module ：以 nodejs 为例，整个系统运行之后，会用 Module 缓存每一个模块加载的信息。
 * require 避免重复加载
 *  从上面我们可以直接得出，require 如何避免重复加载的，首先加载之后的文件的 module 会被缓存到 Module 上，
 *  比如一个模块已经 require 引入了 a 模块，如果另外一个模块再次引用 a ，那么会直接读取缓存值 module ，所以无需再次执行模块。
 *
 *  exports 和 module.exports 的区别
 *  module.exports可以单独导出一个对象, 也可以单独导出一个函数或者一个类.
 *  而且exports只能一个一个到处,在导入时会被合并成一个对象.
 *  exports 就是传入到当前模块内的一个对象，本质上就是 module.exports.
 *  为什么 exports={} 直接赋值一个对象就不可以呢？而是要通过 module.exports 来赋值呢？
 *  `module.exports`** 是实际导出的对象。
 *   **`exports`** 是 `module.exports` 的一个引用，最初它指向同一个对象，但如果你直接给 `exports` 赋值一个新的对象，
 *   `exports` 就不再指向 `module.exports`。
 */