{
    // typeof 关键词
    // typeof 关键词除了做类型保护 还可以从实现推出类型
    // 先定义变量，再定义类型
    let p1 = {
        name: "hello",
        age: 10,
        gender: "male",
    };
    type People = typeof p1;    // 从 p1 推断出 People 的类型
    function getName1(p: People): string {
        return p.name;
    }
    getName1(p1);

    // keyof 关键词
    // keyof 可以用来取得一个对象接口的所有 key 值
    interface Person {
        name: string;
        age: number;
        gender: "male" | "female";
    }
    //type PersonKey = 'name'|'age'|'gender';
    type PersonKey = keyof Person;

    // 可以限制传入的 key 必须是 PersonKey 类型
    function getValueByKey(p: Person, key: PersonKey) {
        return p[key];
    }
    let val = getValueByKey({ name: "hello", age: 10, gender: "male" }, "name");
    console.log(val);

    // 索引访问操作符
    // 使用 [] 操作符可以进行索引访问操作
    interface Person {
        name: string;
        age: number;
    }

    type x = Person["name"]; // x is string
    let aa: x = "hello"; // ok

    // 映射类型 in
    interface Person {
        name: string;
        age: number;
        gender: "male" | "female";
    }
    //批量把一个接口中的属性都变成可选的
    type PartPerson = {
        [Key in keyof Person]?: Person[Key];    // Key 是 Person 的 属性名，如 name, age
    };

    let p2: PartPerson = {};

    // infer 关键字
    // 条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用
    type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

}