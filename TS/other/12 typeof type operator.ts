const center = {
  x: 0,
  y: 0,
  z: 0,
};

// type Point = {
//   x: number;
//   y: number;
//   z: number;
// };

type Point = typeof center;

// const unit: Point = {
//   x: center.x + 1,
//   y: center.y + 1,
// };

// 从center中获取类型，然后赋值给unit
// typeof就是用于从以有的值中获取类型
const unit: typeof center = {
  x: center.x + 1,
  y: center.y + 1,
  z: 0,
};

////////////////////////

const personResponse = {
  name: "alex",
  email: "alex@imooc.com",
  firstName: "alex",
  lastName: "liu",
};

type PersonResponse = typeof personResponse;  // 从personResponse中获取类型，然后赋值给PersonResponse，这样就不用再定义一遍

function process(person: PersonResponse) {
  console.log("full name: ", person.firstName + person.lastName);
}
