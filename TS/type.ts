
{
    var hello = "hello world";

    console.log(hello);

    // 先运行：tsc main1.ts生成main1.js
    // 再运行：node main1.js运行js文件

    //-----------------------------------------------------------------------------
    const enum Color {
        RED,
        PINK,
        BLUE,
    }

    const enum Color1 {
        RED = "红色",
        PINK = "粉色",
        BLUE = "蓝色",
    }
    // 编译后的js如下：
    // var color = ["\u7EA2\u8272" /* Color.RED */, "\u7C89\u8272" /* Color.PINK */, "\u84DD\u8272" /* Color.BLUE */];

    const color: Color[] = [Color.RED, Color.PINK, Color.BLUE];

    //编译之后的js如下：
    // var color = [0 /* RED */, 1 /* PINK */, 2 /* BLUE */];
    // 可以看到我们的枚举并没有被编译成js代码 只是把color这个数组变量编译出来了

    //-----------------------------------------------------------------------------

    // @ts-ignore
    const sym1 = Symbol("hello");
    // @ts-ignore
    const sym2 = Symbol("hello");
    // @ts-ignore
    console.log(Symbol("hello") === Symbol("hello"));

    //-----------------------------------------------------------------------------
    /**
     * unknown和any都是TypeScript中的顶级类型，但它们在安全性和使用方式上有显著的区别：
     * 1. 安全性。
     * any类型基本上是对类型检查的一种放弃。
     * unknown类型则是一种安全的any。它表示一个值的类型未知，因此TypeScript不允许
     * 我们对unknown类型的变量进行任意操作。
     * 如果我们想要对一个unknown类型的变量进行操作，我们必须首先进行类型检查或类型断言，以确保操作的安全性。
     * 2. 使用场景。
     * 使用any可以快速地编写代码，不受类型系统的限制，但这通常不推荐，因为这样做会失去TypeScript提供的大部分类型安全保障。
     * unknown类型适用于那些我们确实不知道或不关心具体类型的情况，但我们仍然希望在编译时保持类型安全。
     * 例如，处理外部数据或编写类型安全的通用函数时，unknown是一个更好的选择。
     * 3. 类型兼容性：
     * any类型与任何其他类型互相兼容，这意味着你可以将any类型的值赋给任何类型的变量，反之亦然。
     * unknown类型则只能赋值给unknown和any类型的变量。如果你想将unknown类型的值赋给其他类型的变量，你必须先进行类型检查或类型断言。
     */
    let value: unknown; // 如果是any则不会报错

    value = true; // OK
    value = 42; // OK
    value = "Hello World"; // OK
    value = []; // OK
    value = {}; // OK

    let value1: unknown = value; // OK
    let value2: any = value; // OK
    // let value3: boolean = value; // Error
    // let value4: number = value; // Error
    // let value5: string = value; // Error
    // let value6: object = value; // Error
    // value.toString();    // Error

    //-----------------------------------------------------------------------------
    /**
     * never 一般表示用户无法达到的类型 例如never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
     * 
     * 思考:never 和 void 的区别
     * void 可以被赋值为 null 和 undefined 的类型。 never 则是一个不包含值的类型。
     * 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
     */
    function neverReach(): never {
        throw new Error("an error");
    }

    // 7种原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol 和 ES10 中的新类型 BigInt。

    // object 类型用于表示非原始类型,所以小object表示的范围窄,只能表示非原始类型
    let objectCase: object;
    // objectCase = 1; // error
    // objectCase = "a"; // error
    // objectCase = true; // error
    // objectCase = null; // error
    // objectCase = undefined; // error
    objectCase = {}; // ok

    // 大 Object 代表所有拥有 toString、hasOwnProperty 方法的类型 所以所有原始类型、非原始类型都可以赋给 Object
    let ObjectCase: Object;
    ObjectCase = 1; // ok
    ObjectCase = "a"; // ok
    ObjectCase = true; // ok
    // ObjectCase = null; // error
    // ObjectCase = undefined; // error
    ObjectCase = {}; // ok

    // {} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合
    let simpleCase: {};
    simpleCase = 1; // ok
    simpleCase = "a"; // ok
    simpleCase = true; // ok
    // simpleCase = null; // error
    // simpleCase = undefined; // error
    simpleCase = {}; // ok

    let flag; //推断为any
    let count = 123; //为number类型
    let helloStr = "hello"; //为string类型
    // count = "aaa";  // 一旦进行了类型推论，就不能再赋值为其他类型了

    // 联合类型
    let name: string | number;
    name = "hello";
    console.log(name.toString());
    name = 1;
    console.log(name.toFixed(2));
    name = "hello";
    console.log(name.length);

    // 类型断言，以上两种方式虽然没有任何区别，但是尖括号格式会与 react 中 JSX 产生语法冲突，因此我们更推荐使用 as 语法。
    // 尖括号 语法
    let someValue: any = "this is a string";
    let strLength: number = (<string>someValue).length;
    // as 语法
    let strLengthAS: number = (someValue as string).length;

    // 非空断言 在上下文中当类型检查器无法断定类型时 一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型
    let flagNotNull: null | undefined | string;
    flagNotNull!.toString(); // ok
    // flagNotNull.toString(); // error

    // 字面量类型
    // 在 TypeScript 中，字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。目前，TypeScript 支持 3 种字面量类型：字符串字面量类型、
    // 数字字面量类型、布尔字面量类型，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型。
    // 字面量类型在TypeScript中非常有用，特别是在需要限定函数参数、返回值或变量为特定的值时。它们可以帮助提高代码的可读性和健壮性，确保变量
    // 不会被意外地赋予错误的值。此外，字面量类型经常与联合类型、类型守卫等高级类型特性结合使用，以实现更复杂的类型逻辑和模式。
    let flag1: "hello" = "hello";
    let flag2: 1 = 1;
    let flag3: true | false = true;

    // 类型别名
    // 类型别名用来给一个类型起个新名字。类型别名有时和接口很像，但是可以作用于原始值、联合类型、元组以及其它任何你需要手写的类型。
    // 类型别名常用于联合类型
    type typeFlag = string | number;
    function helloType(value: typeFlag) { }

    // 交叉类型
    // 交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
    type Flag1x = { x: number };
    type Flag2x = Flag1x & { y: string };

    let flag3x: Flag2x = {
        x: 1,
        y: "hello"
    };

    // 类型保护
    // 类型保护就是一些表达式，他们在编译的时候就能通过类型信息确保某个作用域内变量的类型 其主要思想是尝试检测属性、方法或原型，以确定如何处理值。
    // typeof 类型保护
    function double(input: string | number | boolean) {
        if (typeof input === "string") {
            return input + input;
        } else {
            if (typeof input === "number") {
                return input * 2;
            } else {
                return !input;
            }
        }
    }
    double("hello");

    // in 类型保护,in是对interface来说的
    interface Bird {
        fly: number;
    }

    interface Dog {
        leg: number;
    }

    function getNumber(value: Bird | Dog) {
        if ("fly" in value) {
            return value.fly;
        }
        return value.leg;
    }

    // instanceof 类型保护,是对class来说的
    class Animal {
        name!: string;
    }
    class Bird extends Animal {
        fly!: number;
    }
    function getName(animal: Animal) {
        if (animal instanceof Bird) {
            console.log(animal.fly);
        } else {
            console.log(animal.name);
        }
    }

    // 自定义类型保护
    function isObject(value: unknown): value is object {
        return typeof value === "object" && value !== null;
    }

    function fn(x: string | object) {
        if (isObject(x)) {
            // ....
        } else {
            // .....
        }
    }

    // 在TypeScript中，typeof操作符用于两种主要场景：
    // 1. 获取变量的类型：当用于变量时，typeof可以获取该变量的类型。这在TypeScript中主要用于类型注解，以便在编译时进行类型检查。
    // 例如，如果你有一个变量x，并且你想创建另一个变量y，它的类型与x相同，你可以使用typeof x来注解y的类型。
    let x = "hello";
    let y: typeof x;  // y的类型是string，因为x是string
    // 2. 在类型上下文中引用类或对象的类型：在类型上下文（即在类型注解或其他类型操作中）中，typeof也可以用来获取一个类或对象的类型。
    // 这对于当你需要引用一个对象的确切结构，或者类的实例类型时非常有用。这种用法允许你在不定义新接口或类型别名的情况下，复用已有变量或对象的类型。
    class MyClass {
        constructor(public id: number) { }
    }

    let instance = new MyClass(10);
    let anotherInstance: typeof instance;  // anotherInstance的类型是MyClass
}