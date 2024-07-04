type Person = {
  name: string;
  age: number;
  location: string;
};

const alex: Person = {
  name: "alex",
  age: 35,
  location: "广州",
};

// 用于限定key的值，只能是Person的key

// function getValueByKey(obj: any, key: string) {
// function getValueByKey(obj: any, key: "name" | "age" | "email") {  可以使用字面量类型
// function getValueByKey(obj: Person, key: keyof Person) { // keyof Person表示Person的所有key
function getValueByKey<Obj, Key extends keyof Obj>(obj: Obj, key: Key) { // 使用泛型
  const value = obj[key]; // 方括号语法，获取对象的属性值
  console.log("Getting: ", key, value);
  return value;
}

const age = getValueByKey(alex, "age");
// const email = getValueByKey(alex, "email");

// type PersonKey = keyof Person

// 同样，set函数也能限定key的值
function setValueByKey<Obj, Key extends keyof Obj>(obj: Obj, key: Key, value: Obj[Key]) {
  obj[key] = value
}

setValueByKey(alex, "age", 18)