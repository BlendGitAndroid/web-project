const king = "alex";
// king = "john";
const upercase = king.toUpperCase();

const alex = {
  name: "alex",
  job: "developer",
} as const; // 通过as const断言，使得对象的属性变为只读

// alex = {
//   name: "jack",
//   job: "teacher",
// };

// alex.name = "jack";
// alex.job = "teacher";

// 例2
function layout(setting: {
  align: "left" | "center" | "right"; // 使用字面量类型，限制取值范围
  padding: number;
}) {
  console.log("Layout: ", setting);
}

const example = {
  align: "left",
  padding: 0,
} as const;

layout(example);
// layout({ align: "top", padding: 10 });
