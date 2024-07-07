/**
 * 这段TypeScript代码位于一个声明文件（通常以.d.ts结尾）中，用于提供模块的类型声明。这里，它声明了一个模块，
 * 该模块的名称模式为*.css，这意味着这个声明适用于所有以.css结尾的文件。这种模式匹配的声明方式在处理项目中
 * 的静态资源文件（如CSS、图片等）时非常有用，因为它允许TypeScript理解并处理非代码资源的导入。
 * 在这个声明中，定义了一个名为css的常量，其类型为一个对象，这个对象的键是字符串类型，值也是字符串类型。
 * 这种类型定义通常用于CSS模块的情况，其中导入CSS文件时，实际上会得到一个对象。这个对象的键是类名，
 * 值是由构建工具（如Webpack）生成的唯一标识符，这样可以确保CSS类名的唯一性，避免样式冲突。
 * 通过export default css;语句，这个css对象被设置为模块的默认导出。这意味着当你在TypeScript文件中导入一个.css文件时，
 * 你实际上导入的是这个css对象。例如，如果你有一个styles.css文件，并且使用了CSS模块的方式进行构建，
 * 那么在TypeScript文件中导入这个CSS文件import styles from './styles.css';时，styles就是这里声明的css对象，
 * 你可以通过styles.className的方式访问到具体的类名。
 * 这种声明方式极大地增强了在TypeScript项目中使用CSS模块的体验，使得开发者可以享受到类型检查的好处，同时也保持了CSS模
 * 块的便利性和强大功能。
 */
declare module "*.css" {
  const css: { [key: string]: string };
  export default css;
}