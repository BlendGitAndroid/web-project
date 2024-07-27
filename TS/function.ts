{
    // 函数的定义,可以指定参数的类型和返回值的类型,函数的返回值类型可以省略，ts会自动推断
    function helloFunc(name: string): void {
        console.log("hello", name);
    }
    helloFunc("hahaha");

    // 函数表达式，使用type定义函数类型，其接受两个number类型的参数，返回值为number类型
    type SumFunc = (x: number, y: number) => number;
    // 使用函数表达式定义函数
    let countNumber: SumFunc = function (a, b) {
        return a + b;
    };

    countNumber(1, 2);

    // 可选参数：在参数后面加上?，表示该参数可选，而且必须是最后一个参数
    function printFunc(name: string, age?: number): void {
        console.log(name, age);
    }
    printFunc("hahaha");

    // 默认参数：在参数后面加上=，表示该参数有默认值
    function ajaxFunc(url: string, method: string = "GET") {
        console.log(url, method);
    }
    ajaxFunc("/users");

    // 剩余参数：使用...表示剩余参数，类型为数组
    function sum(...numbers: number[]) {
        return numbers.reduce((val, item) => (val += item), 0);
    }
    // 使用剩余参数，可以传入任意个数的参数，使用逗号分隔
    console.log(sum(1, 2, 3));

    // 函数重载：在函数实现之前，使用函数声明，声明函数的重载
    // 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。 在 TypeScript 中，表现为给同一个函数提供多个函数类型定义
    // 注意：函数重载真正执行的是同名函数最后定义的函数体 在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型
    let obj: any = {};
    function attr(val: string): void;
    function attr(val: number): void;
    function attr(val: any): void {
        if (typeof val === "string") {
            obj.name = val;
        } else {
            obj.age = val;
        }
    }
    attr("hahaha");
    attr(9);
    // attr(true);
    console.log(obj);


}