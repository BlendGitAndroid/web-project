const url = "http://mylogger.io/log";

function log(message) {
    console.log(message);
}

/**
 * 里面有一个module对象，它代表当前模块本身，而exports是module的一个属性，它是module.exports的一个引用。
 * {
  '9': [Function: internalRequire],
  id: '.',
  path: 'C:\\Project\\web-project\\NodeJsBase',
  exports: {},
  filename: 'C:\\Project\\web-project\\NodeJsBase\\logger.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Project\\web-project\\NodeJsBase\\node_modules',     
    'C:\\Project\\web-project\\node_modules',
    'C:\\Project\\node_modules',
    'C:\\node_modules'
  ]
}
 */

// 当这个模块被加载的时候，会执行这个文件里面的代码
console.log("running logger.js");

// __filename是一个全局变量，它指向当前执行脚本所在的文件的绝对路径，和module一样是Node.js提供的一个全局变量
console.log(__filename);

module.exports.endPoint = url;
module.exports.log = log;
console.log(module) 