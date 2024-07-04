// 个函数通过使用this关键字，指定了它期望的上下文（或者说是它应该被调用的对象的形状）
function double(this: { value: number }) {  // 这里指定了this的类型，参数必须是第一个
  this.value = this.value * 2;
}

const valid = {
  value: 10,
  double,
};

valid.double();
console.log(valid.value);

//-----------------------------------------------------------------------------------

function double11() {
  this.value = this.value * 2;
}

const invalid = {
  valve: 10,  // 这里拼写错误了，但是编译器没有报错
  double11,
};

invalid.double11(); // double11里面的值是value，而不是valve
