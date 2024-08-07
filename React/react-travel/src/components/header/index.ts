// 具体来说，export * from './Header'这行代码的作用是将当前目录下的Header模块（假设是Header.ts或Header/index.ts）
// 中导出的所有内容（包括变量、函数、类等）再次导出。这意味着，其他模块现在可以通过导入index.ts模块来间接访问Header
// 模块中的所有导出，而不需要直接引用Header模块的路径。
export * from './Header'

/**
 * 这种模式有几个好处：
简化导入路径：使用者只需要从一个统一的入口（如index.ts）导入所需的模块，而不必关心这些模块的具体文件路径，这使得导入语句更加简洁。
提高封装性：通过index.ts作为模块的公开接口，可以更容易地控制哪些模块或功能是对外可见的，有助于隐藏内部结构，减少耦合。
便于重构：如果项目结构发生变化，只需要在index.ts中更新导出路径，而使用这些模块的代码不需要做任何修改。
 */