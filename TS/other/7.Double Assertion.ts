type Point2D = { x: number; y: number };
type Point3D = { x: number; y: number; z: number };
type Person = { name: string; email: string };

let point2: Point2D = { x: 0, y: 0 };
let point3: Point3D = { x: 10, y: 10, z: 10 };
let person: Person = { name: "alex", email: "alex@imooc.com" };

point2 = point3;    // 多类型的数据，可以自动转换为少类型的数据
// point3 = point2; // error，反过来是不行的
point3 = point2 as Point3D // 好吧，别骗我，相信你

// person = point3; // error 
// point3 = person; // error
// point3 = person as Point3D // 少骗我，我不信
point3 = person as any as Point3D // 拐着弯来骗我，这里使用双重断言