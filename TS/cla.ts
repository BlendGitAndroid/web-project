{
    // 类的定义
    // 当然 如果我们图省事 我们也可以把属性定义直接写到构造函数的参数里面去(不过一般不建议这样写 因为会让代码增加阅读难度)
    class Person {
        name!: string; //如果初始属性没赋值就需要加上!
        constructor(_name: string) {
            this.name = _name;
        }

        // constructor(public name: string) {} // 等价于上面的写法

        getName(): void {
            console.log(this.name);
        }
    }
    let p1 = new Person("hello");
    p1.getName();

    // 注意：当我们定义一个类的时候,会得到 2 个类型 一个是构造函数类型的函数类型(当做普通构造函数的类型) 另一个是类的实例类型（代表实例）
    class Component {
        static myName: string = "静态名称属性";
        myName: string = "实例名称属性";
    }
    //ts 一个类型 一个叫值
    //放在=后面的是值
    let com = Component; //这里是代表构造函数，是一个函数类型
    //冒号后面的是类型
    let c: Component = new Component(); //这里是代表实例类型
    // 如果Component是一个类，那么typeof Component就代表这个类的构造函数的类型；如果Component是一个对象，那么typeof Component就代表这个对象的类型。
    let f: typeof Component = com;

    // 存储器，以通过存取器来改变一个类中属性的读取和赋值行为
    class User {
        myname: string;
        constructor(myname: string) {
            this.myname = myname;
        }
        get name() {
            return this.myname;
        }
        set name(value) {
            this.myname = value;
        }
    }

    let user = new User("hello");
    user.name = "world";
    console.log(user.name);

    // readonly 只读属性
    // readonly 修饰的变量只能在构造函数中初始化 TypeScript 的类型系统同样也允许将 interface、type、 
    // class 上的属性标识为 readonly readonly 实际上只是在编译阶段进行代码检查。
    class Animal {
        public readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
        // changeName(name: string) {
        //     this.name = name; //这个ts是报错的
        // }
    }
    let a = new Animal("hello");

    //继承
    class PersonExtends {
        name: string; //定义实例的属性，默认省略public修饰符
        age: number;
        constructor(name: string, age: number) {
            //构造函数
            this.name = name;
            this.age = age;
        }
        getName(): string {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }
    class Student extends PersonExtends {
        no: number;
        constructor(name: string, age: number, no: number) {
            super(name, age);
            this.no = no;
        }
        getNo(): number {
            return this.no;
        }
    }
    let s1 = new Student("hello", 10, 1);
    console.log(s1);

    // 类里面的修饰符
    // public 类里面 子类 其它任何地方外边都可以访问 
    // protected 类里面 子类 都可以访问,其它任何地方不能访问 
    // private 类里面可以访问，子类和其它任何地方都不可以访问
    class Parent {
        public name: string;
        protected age: number;
        private car: number;
        constructor(name: string, age: number, car: number) {
            //构造函数
            this.name = name;
            this.age = age;
            this.car = car;
        }
        getName(): string {
            return this.name;
        }
        setName(name: string): void {
            this.name = name;
        }
    }
    class Child extends Parent {
        constructor(name: string, age: number, car: number) {
            super(name, age, car);
        }
        // desc() {
        //     console.log(`${this.name} ${this.age} ${this.car}`); //car访问不到 会报错
        // }
    }

    let child = new Child("hello", 10, 1000);
    console.log(child.name);
    // console.log(child.age); //age访问不到 会报错
    // console.log(child.car); //car访问不到 会报错


    // 静态属性 静态方法
    class ParentStatic {
        static mainName = "Parent";
        static getmainName() {
            console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
            return this.mainName;
        }
        public name: string;
        constructor(name: string) {
            //构造函数
            this.name = name;
        }
    }
    console.log(ParentStatic.mainName);
    console.log(ParentStatic.getmainName());

    // 抽象类和抽象方法
    // 思考 1:重写(override)和重载(overload)的区别
    class AnimalOverride {
        speak(word: string): string {
            return "动物:" + word;
        }
    }
    class Cat extends AnimalOverride {
        speak(word: string): string {
            return "猫:" + word;
        }
    }
    let cat = new Cat();
    console.log(cat.speak("hello"));
    // 上面是重写
    //--------------------------------------------
    // 下面是重载
    function doubleOverload(val: number): number;
    function doubleOverload(val: string): string;
    function doubleOverload(val: any): any {
        if (typeof val == "number") {
            return val * 2;
        }
        return val + val;
    }

    let r = doubleOverload(1);
    console.log(r);

    // 思考 2:什么是多态
    // 在父类中定义一个方法，在子类中有多个实现，在程序运行的时候，根据不同的对象执行不同的操作，实现运行时的绑定。
    abstract class AnimalPolymorphism {
        // 声明抽象的方法，让子类去实现
        abstract sleep(): void;
    }
    class DogPolymorphism extends AnimalPolymorphism {
        sleep() {
            console.log("dog sleep");
        }
    }
    class CatPolymorphism extends AnimalPolymorphism {
        sleep() {
            console.log("cat sleep");
        }
    }
    let catPolymorphism = new CatPolymorphism();
    let dogPolymorphism = new DogPolymorphism();
    let animals: AnimalPolymorphism[] = [dogPolymorphism, catPolymorphism];
    animals.forEach((i) => {
        i.sleep();
    });





}