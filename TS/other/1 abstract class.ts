abstract class Command {
    abstract commandLine(): string;
    excute() {
        console.log("执行: ", this.commandLine());
    }
}

class GitReset extends Command {
    commandLine() {
        return "git reset --hard"
    }
}

class GitFetch extends Command {
    commandLine() {
        return "git fetch --all"
    }
}

new GitReset().excute();
new GitFetch().excute();

{
    // JS语法真是太奇妙了,points是一个对象
    let drawPoint = (point) => {
        console.log({ x: point.x, y: point.y });
    }

    drawPoint({ x: 105, y: 24 });
    drawPoint({ x: "阿莱克", y: "刘老师" });
    drawPoint({ wether: "干燥", temperature: "5oC" });


    // 使用接口定义对象
    let drawPoint1 = (point: Point) => {
        console.log({ x: point.x, y: point.y });
    }

    interface Point {
        x: number;
        y: number;
        drawPoint: () => void;
        getDistance: (point: Point) => number;
    }

    // 使用类实现接口，但是js类不可以重载
    class PointClass implements Point {

        // x: number;
        // y: number;
        // constructor(x: number = 0, y: number = 0) {
        //     this.x = x;
        //     this.y = y;
        // }

        // 使用public关键字，可以省略上面的定义
        constructor(public x: number = 0, public y: number = 0) {
        }

        drawPoint: () => void = () => {
            console.log({ x: this.x, y: this.y });
        };
        getDistance: (point: Point) => number = (point: Point) => {
            return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
        };
    }

    const point1 = new PointClass();
    point1.x = 10;
}
