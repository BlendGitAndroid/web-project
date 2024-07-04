type Point = {
  readonly x: number;
  y?: number;
};

type Mapped<T> = {
  -readonly // readonly [P in keyof T]: T[P]
  [P in keyof T]?: T[P];  // 所有的类型都是可选的
};

type Result = Mapped<Point>;


// 创建局部类型映射，这个在TS内置了
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export class State<T> {

  constructor(public current: T) { }

  update(next: Partial<T>) {
    this.current = { ...this.current, ...next };
  }
}

const state = new State({ x: 0, y: 0 });
state.update({ y: 123 });
console.log(state.current);
