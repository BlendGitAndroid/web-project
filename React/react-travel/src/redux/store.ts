import { createStore, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer";
import thunk from "redux-thunk";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./order/slice";


// Reduct的store

// 持久化配置
const persistConfig = {
  key: "root",
  storage,  // 使用localStorage作为持久化存储
  whitelist: ["user"] // 白名单，只有rootReducer中user的数据会被持久化
}

// 2. 创建reducer，将所有的reducer合并成一个reducer
// combineReducers是从RTK中导入的，用于将多个reducer合并成一个reducer，而不是从redux中导入的
const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,  // 这个是用TRK创建的slice，使用它的reducer
  productSearch: productSearchSlice.reducer,
  user: userSlice.reducer,  // 用户登录信息
  shoppingCart: shoppingCartSlice.reducer,
  order: orderSlice.reducer
})

// 配置持久化reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 1. 创建store，传入reducer和中间件，thunk是用于处理异步action的中间件
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

// configureStore是从RTK中导入的，用于替换createStore，这样就能使用createAsyncThunk创建异步action
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), actionLog], // getDefaultMiddleware默认包含了redux-thunk
  devTools: false, // 开启Redux DevTools，需要使用Chrome浏览器安装Redux DevTools插件
});

const persistor = persistStore(store)

// 获取store的类型
// ReturnType<T>是TypeScript中的一个工具类型，用于获取一个函数返回值的类型。
/**
 * 在这段代码中，typeof 关键字被用于获取 store.getState 函数的类型。store.getState 是一个函数，当你调用它时，
 * 它会返回当前 Redux store 的状态。在 TypeScript 中，typeof 可以用来获取一个变量或对象的类型，包括函数的返回类型。
 * 然而，仅仅使用 typeof store.getState 会得到这个函数本身的类型，而不是函数调用的返回值类型。为了获取函数调用
 * 的返回值类型，我们需要使用 TypeScript 的 ReturnType 工具类型。
 * ReturnType<T> 是一个泛型工具类型，它接受一个类型 T 作为参数。如果 T 是一个函数类型，
 * 那么 ReturnType<T> 的结果就是这个函数的返回值类型。
 */
// store.getState是一个函数，调用它会返回当前Redux store的状态，其状态定义在rootReducer中，
// 所以store.getState的返回值类型就是rootReducer的返回值类型。
// state就是reducer的输出，所以state的类型就是reducer的输出类型，但是数据保存在store中。
export type RootState = ReturnType<typeof store.getState>

export default { store, persistor };