// https://www.udemy.com/course/typescript-for-professionals/learn/lecture/22346046#overview

type Add2 = (a: number, b: number) => number;  // 函数签名

// 函数调用签名，和上面的一样
type Add22 = {
  (a: number, b: number): number;
}

type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
  debugName?: string;
};

const add1: Add = (a: number, b: number) => {
  return a + b;
};

// 如果将 c 参数去掉?，会报错，原因是尝试将 add 函数分配给 Add 类型时，
// add 函数的定义只满足了 Add 类型中的第二个调用签名（接受三个参数的那个），但没有满足第一个调用签名（接受两个参数的那个）。
const add: Add = (a: number, b: number, c?: number): number => {
  return a + b + (c != null ? c : 0);
};

add.debugName = "附加信息";

// 例 2
// type Point = new (x: number, y: number) => { x: number; y: number };
type Point = {
  new(x: number, y: number): { x: number; y: number }
  new(x: number, y: number, z: number): { x: number; y: number }
}

// 这段代码展示了TypeScript中类型定义和类表达式的强大组合。通过Point类型的定义，我们明确了任何符合该类型的类必须能够通过
// 两种构造函数之一来创建对象。然而，实际的类实现只提供了一个构造函数，它通过可选参数z来灵活地满足两种构造签名的要求。这种
// 设计允许开发者在创建Point类型的对象时有更大的灵活性，同时确保了对象至少包含x和y两个属性。
const point: Point = class {
  constructor(public x: number, public y: number, z?: number) { }
};
