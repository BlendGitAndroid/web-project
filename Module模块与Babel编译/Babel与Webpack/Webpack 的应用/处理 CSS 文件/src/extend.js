// 为 Number 的原型添加一个扩展方法
// 这是一个有副作用的函数
Number.prototype.pad = function (size) {
  let res = this + ""
  while (res.length < size) {
    res = '0' + res
  }
  return res
}
