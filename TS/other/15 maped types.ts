type Point = {
  x: number;
  y: number;
  z: number;
};

// type ReadonlyPoint = {
//   readonly x: number;
//   readonly y: number;
//   readonly z: number;
// };

// 下面的是上面的简写
// type ReadonlyPoint = {
//   readonly [key in "x" | "y" | "z"]: number;
// }

// 下面的实现比较累赘，可以使用映射类型实现
type ReadonlyPoint = {
  readonly [item in keyof Point]: Point[item];  // 通过映射类型实现，使用使用lookup type获取payment的类型
};

// 定义类型映射，通过泛型，这个已经在TS内置了
type ReadOnly<T> = {
  readonly [item in keyof T]: T[item];
};


const center: ReadOnly<Point> = {
  x: 0,
  y: 0,
  z: 0,
};

// center.x = 100;
