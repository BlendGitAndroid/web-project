const url = "http://mylogger.io/log";

function log(message) {
    console.log(message);
}

/**
 * 在commonJS中，一个文件就是一个module，在这个文件里面可以定义变量、函数、对象等。
 * 里面有一个module对象，它代表当前模块本身，而exports是module的一个属性，它是module.exports的一个引用。
 * Module {
 *   id: '.',
 *   path: 'C:\\Project\\web-project\\NodeJs\\base',
 *   exports: { endPoint: 'http://mylogger.io/log', log: [Function: log] },
 *   filename: 'C:\\Project\\web-project\\NodeJs\\base\\logger.js',
 *   loaded: false,
 *   children: [],
 *   paths: [
 *     'C:\\Project\\web-project\\NodeJs\\base\\node_modules',
 *     'C:\\Project\\web-project\\NodeJs\\node_modules',
 *     'C:\\Project\\web-project\\node_modules',
 *     'C:\\Project\\node_modules',
 *     'C:\\node_modules'
 *   ]
 * }
 */

// 当这个模块被加载的时候，会执行这个文件里面的代码
console.log("running logger.js");

// __filename是一个全局变量，它指向当前执行脚本所在的文件的绝对路径，和module一样是Node.js提供的一个全局变量
console.log(__filename);

module.exports.endPoint = url;
module.exports.log = log;

// 和上面的代码是等价的
// exports.endPoint = url;
// exports.log = log;
console.log(module) 