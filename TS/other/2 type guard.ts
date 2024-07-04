type Square = {
  size: number;
};

type Rectangle = {
  width: number;
  height: number;
};

type Shape = Square | Rectangle;

// 类型守卫是TypeScript中的一种特性，允许你在函数中通过返回一个特定的类型断言来缩小变量的类型范围。这在处理联合类型时非常有用。
// 类型谓词是TypeScript中的一种特殊语法，用于在函数类型签名中指定一个参数的类型。它允许你在运行时检查一个值的类型，并且在编译时
// 期为这个值提供更具体的类型信息。类型谓词通常用在类型守卫（Type Guards）中，帮助TypeScript的类型检查器理解条件检查后变量的具体类型。
// function isSquare(shape: Shape): boolean {
function isSquare(shape: Shape): shape is Square {  //  这里的shape is Square是类型谓词，它告诉TypeScript这个函数返回的是一个类型为Square的值
  return "size" in shape;
}

function isRectangle(shape: Shape): shape is Square {
  return "width" in shape;
}

function area(shape: Shape) {
  //   if ("size" in shape) {
  if (isSquare(shape)) {
    return shape.size * shape.size;
  }
  //   if ("width" in shape) {
  if (isRectangle(shape)) {
    return shape.width * shape.height;
  }
}
