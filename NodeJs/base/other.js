// 直接导出一个函数
// 在使用的时候,通过require函数加载这个模块，然后就可以直接使用这个函数了
module.exports = function (message) {
    console.log("module.exports: " + message);
}