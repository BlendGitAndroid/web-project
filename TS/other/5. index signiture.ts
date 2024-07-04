// 索引签名
const obj = {
  hello: "world",
};

const dddddd = obj["hello"]

console.log(obj["hello"]); // world

// const nums = {
//   1337: "leet",
// };

// console.log(nums[1337]); // leet

// 在这段TypeScript代码中，我们定义了一个名为Dictionary的类型。这个类型是一个索引签名（index signature），
// 它的作用是描述一个对象，这个对象可以拥有任意数量的属性，而这些属性的键（key）是字符串类型，属性的值（value）是布尔类型（boolean）。
type Dictionary = {
  [key: string]: boolean;
};

/**
 * 索引签名的语法是在类型定义中使用方括号[]，其中key: string指定了键的类型为字符串，而冒号后面的boolean则指定了值的类型。
 * 这意味着，当你使用Dictionary类型的对象时，你可以自由地添加任意多的键值对，只要键是字符串，值是布尔值即可。
 */

type Person = {
  name: string;
  email: string;
};

type PersonDictionary = {
  [username: string]: Person;
};

const persons: PersonDictionary = {
  alex: {
    name: "阿莱克斯",
    email: "alex@imooc.com",
  },
  michael: {
    name: "jackson",
    email: "mj@imooc.com",
  },
};

console.log(persons["alex"])
delete persons["alex"];

const result = persons["missing"]
console.log(result, result.email) // undefined, error