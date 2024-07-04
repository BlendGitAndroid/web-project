{
    // 除了类可以继承 接口也可以继承 同样的使用 extends关键字

    // 对象的形状，在TypeScript中，接口（interface）可以用来定义一个对象的结构，而不需要通过类（class）来实现它。
    // 接口定义了对象应有的形状，包括它应该包含哪些属性和方法，以及这些属性和方法的类型。当你创建一个对象时，如果它
    // 的形状符合某个接口的定义，那么它就可以被认为是那个接口的一个实例，即使没有通过class来显式实现那个接口。
    // 接口可以用来描述`对象的形状`
    interface Speakable {
        speak(): void;
        readonly lng: string; //readonly表示只读属性 后续不可以更改
        name?: string; //？表示可选属性
    }

    // 通过接口来约束对象的结构
    let speakman: Speakable = {
        speak() { }, //少属性会报错
        name: "hello",
        lng: "en",
        // age: 111, //多属性也会报错
    };

    // 行为的抽象。接口可以把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
    // 接口可以在面向对象编程中表示为行为的抽象
    interface Speakable1 {
        speak(): void;
    }
    interface Eatable1 {
        eat(): void;
    }
    //一个类可以实现多个接口
    class PersonInterface implements Speakable1, Eatable1 {
        speak() {
            console.log("Person说话");
        }
        eat() { } //需要实现的接口包含eat方法 不实现会报错
    }

    // 函数类型接口
    // 不同于常见的属性或方法定义，这里的discount接口定义了一个函数签名。这意味着任何符合discount接口的函数都
    // 必须接受一个number类型的参数，并返回一个number类型的结果。
    interface discount {
        (price: number): number;
    }
    let cost: discount = function (price11: number): number {
        return price11 * 0.8;
    };

    // 构造函数的类型接口
    // 其实这样的用法一般出现在 当我们需要把一个类作为参数的时候 我们需要对传入的类的构造函数类型进行约束 
    // 所以需要使用 new 关键字代表是类的构造函数类型 用以和普通函数进行区分
    class Animal {
        constructor(public name: string) { }
    }
    // 这个接口使用了TypeScript的特殊语法new，这里的new不是用来创建实例，而是用来描述一个构造签名。
    // 这意味着任何符合WithNameClass接口的类都必须能够通过一个字符串参数name来构造，并且这个构造函数必须返回一个Animal类型的实例。
    // 简而言之，WithNameClass接口定义了一个可以创建Animal实例的类的构造函数的形状。
    interface WithNameClass {
        new(name: string): Animal;
    }
    function createAnimal(clazz: WithNameClass, name: string) {
        return new clazz(name);
    }
    let a = createAnimal(Animal, "hello");
    console.log(a.name);

    // 思考：接口和类型别名的区别 这个题目是经典的 ts 面试题
    // 实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。
    // 1.基础数据类型 与接口不同，类型别名还可以用于其他类型，如基本类型（原始值）、联合类型、元组
    // 2.重复定义，接口可以定义多次 会被自动合并为单个接口 类型别名不可以重复定义
    interface Point {
        x: number;
    }
    interface Point {
        y: number;
    }
    const point: Point = { x: 1, y: 2 };
    // 3.扩展 接口可以扩展类型别名，同理，类型别名也可以扩展接口。但是两者实现扩展的方式不同
    // 接口扩展接口
    interface PointX2 {
        x: number;
    }

    interface Point2 extends PointX2 {
        y: number;
    }
    // ----
    // 类型别名扩展类型别名
    // 这是一个使用type关键字创建的类型别名。类型别名允许我们给一个类型（无论是简单的还是复杂的）定义一个新名字，使得代码更加清晰易懂。
    // PointX3类型描述了一个对象，这个对象有一个名为x的属性。属性x的类型被指定为number，这意味着任何PointX3类型的对象的x属性都必须是一个数字。
    // 在TypeScript中，type关键字可以用来定义一个对象类型，是因为TypeScript支持结构化的类型系统。在这个系统中，
    // 类型不仅可以表示基本数据类型（如number、string等），还可以表示更复杂的结构，如对象的形状。使用type定义一个对象类型，实际上是在描述一个
    // 对象的结构，包括它应该包含哪些属性以及这些属性的类型。
    type PointX3 = {
        x: number;
    };

    type Point3 = PointX3 & {
        y: number;
    };
    // ----
    // 接口扩展类型别名
    type PointX4 = {
        x: number;
    };
    interface Point4 extends PointX4 {
        y: number;
    }
    // ----
    // 类型别名扩展接口
    interface PointX {
        x: number;
    }
    type Point5 = PointX & {
        y: number;
    };











}