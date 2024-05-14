// const age = 18;

// export default age;
// export age; // ×
// export 18;   // ×

// 在JavaScript中，声明是用来创建变量或函数的。例如，var x = 10;是一个变量声明，function foo() {}是一个函数声明。
// 语句是执行某种操作的指令。例如，x = 10;是一个赋值语句，if (x > 10) {}是一个条件语句，for (var i = 0; i < 10; i++) {}是一个循环语句。
// export 声明或语句
// export const age = 18;

// const age = 18;
// // export age; ×

// 总的来说，{} 在 export 和 import 语句中用于指定你想要导出或导入的具体变量、函数或类的名称。
// export { age }; // √

function fn() {}
// export fn; // ×

// 下面这个写法就是对的
// export {fn}; // ×

// export function fn() {}

// export function () {} // 匿名不行

class className {}
// export className;

// export class className {}

// export class  {} // 匿名不行

const age = 18;

// export const age = 18;

// 起一个别名
export { fn as func, className, age };

export default 18;
