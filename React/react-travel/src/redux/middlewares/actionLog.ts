import { Middleware } from "redux";

// 创建中间件，用于打印action和state
// 中间件类似于一个拦截器，可以在action到达reducer之前或之后执行一些操作
export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log("state 当前", store.getState());
  console.log("fire action ", action);
  next(action); // 调用下一个中间件
  console.log("state 更新", store.getState());
};

/**
 * 这种设计模式称为“柯里化”（Currying），它是一种在函数式编程中常用的技术。在Redux中间件中使用柯里化设计有几个原因：

分阶段访问Redux环境：中间件需要访问Redux的store、下一个中间件的next函数和被派发的action。通过柯里化，中间件可以在三个
不同的阶段分别获得这些参数。这种分阶段的方法使得中间件的结构更加清晰和灵活。

便于组合和重用：柯里化允许中间件以灵活的方式被组合和重用。因为每个阶段都返回一个函数，这些函数可以在不同的上下文中以不同
的方式组合使用，增加了中间件的可重用性。

延迟执行：柯里化允许中间件延迟执行某些操作。只有当所有需要的参数都被提供之后，中间件的逻辑才会执行。这种延迟执行对于处理
异步操作或者条件判断尤其有用。

简化中间件的签名：通过柯里化，中间件的签名（即接口）被简化为(store) => (next) => (action) => {}。这种简化使得编写和理
解中间件变得更加容易。


具体到Redux中间件，这种设计允许中间件在接收到store时执行一些初始化操作（如订阅store的变化），在获取到next时设置或修改传
递给下一个中间件的行为，最后在接收到action时执行核心的业务逻辑。这种分步骤的处理方式为中间件提供了极大的灵活性和强大的功能。
 */

/**
 * redux-thunk的源码
 * 
 * function createThunkMiddleware(extraArgs) {
  return ({dispatch, getState}) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgs)
    }

    return next(action)
  }
}

const thunkMiddleware = createThunkMiddleware()

thunkMiddleware.withExtraArgument = createThunkMiddleware

export default thunkMiddleware
 */