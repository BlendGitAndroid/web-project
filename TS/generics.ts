{
    // 这段代码用来生成一个长度为 length 值为 value 的数组 但是我们其实可以发现一个问题 不管我们传入什么类型的 value 返回值的数组永远是 any 类型
    function createArray(length: number, value: any): any[] {
        let result: any[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    createArray(3, "x"); // ['x', 'x', 'x']

    // 使用泛型改造
    function createArray1<T>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

    createArray1<string>(3, "x"); // ['x', 'x', 'x']

    // 多个类型参数，需要有多个未知的类型占位 那么我们可以定义任何的字母来表示不同的类型参数
    function swap<T, U>(tuple: [T, U]): [U, T] {
        return [tuple[1], tuple[0]];
    }
    swap([7, "seven"]); // ['seven', 7]

    // 泛型约束
    // 泛型 T 不一定包含属性 length，所以编译的时候报错了。
    // function loggingIdentity<T>(arg: T): T {
    //     console.log(arg.length);
    //     return arg;
    // }
    // 可以对泛型进行约束，只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束
    interface Lengthwise {
        length: number;
    }

    function loggingIdentity<T extends Lengthwise>(arg: T): T {
        console.log(arg.length);
        return arg;
    }

    // 泛型接口
    interface Cart<T> {
        list: T[];
    }
    // 定义了接口传入的类型 T 之后返回的对象数组里面 T 就是当时传入的参数类型
    let cart: Cart<{ name: string; price: number }> = {
        list: [{ name: "hello", price: 10 }],
    };
    console.log(cart.list[0].name, cart.list[0].price);

    // 泛型类
    class MyArray<T> {
        private list: T[] = [];
        add(value: T) {
            this.list.push(value);
        }
        getMax(): T {
            let result = this.list[0];
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i] > result) {
                    result = this.list[i];
                }
            }
            return result;
        }
    }
    let arr = new MyArray<number>();
    arr.add(1);
    arr.add(2);
    arr.add(3);
    let ret = arr.getMax();
    console.log(ret);

    // 泛型参数的默认类型
    function createArray2<T = string>(length: number, value: T): Array<T> {
        let result: T[] = [];
        for (let i = 0; i < length; i++) {
            result[i] = value;
        }
        return result;
    }

}