import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义一个接口，用于定义state的类型
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

// 定义state的初始值
const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

// 使用了Redux Toolkit的createAsyncThunk创建的异步action。getProductDetail的三个状态：pending、fulfilled和rejected。
export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail", //  第一个参数是action的名称，这个名称会被用于生成action type
  async (touristRouteId: string, thunkAPI) => { // 第二个参数是一个异步函数，用于处理异步逻辑，入参是touristRouteId：string
    const { data } = await axios.get(
      `http://82.157.43.234:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
  }
);

/**
 * 这段TypeScript代码定义了一个名为productDetailSlice的Redux Slice，用于管理产品详情的状态。
 * 这是使用Redux Toolkit的createSlice函数创建的，旨在简化Redux状态管理。createSlice函数接收一个配置对象，
 * 其中包含slice的名称、初始状态、reducers和extraReducers。
 * Slice的好处是可以去除样板代码，不用再手动编写action creators和action types。
 * createAsyncThunk和createSlice是Redux Toolkit的两个核心API，用于创建异步action和slice，是怎么关联起来的呢？
 * 在createSlice的配置对象中，有一个extraReducers字段，用于处理异步action。在这个字段中，我们可以使用方括号语法，
 * 将一个action type映射到一个reducer函数。这个action type就是createAsyncThunk创建的异步action的三个状态：pending、fulfilled和rejected。
 * 当异步action的状态发生变化时，对应的reducer函数就会被调用，从而更新state。
 * 
 * 出现slice的原因是因为Redux Toolkit的createSlice函数会自动处理immer，所以不需要再使用展开运算符。
 * 之前因为：这个数据不可变性亦是被很多初学者吐槽，觉得学习成本比较高，因此现在一些周边库也支持在React 中实现直接修改数据，比如Immer。
 */
export const productDetailSlice = createSlice({
  name: "productDetail",  // slice的名称, 用于在Redux store中标识这个slice
  initialState, // 初始状态,用于生成reducer的初始状态
  reducers: { // reducers是一个对象，包含了一组reducer函数，用于处理同步action
    // 下面的写法暂时没有用到，只是用于学习使用
    // 调用的时候直接调用dispatch(productDetailSlice.actions.fetchStart())
    // fetchStart是一个action creator，用于创建一个action，这个action的type是productDetail/fetchStart
    // createSlice中的reducers是怎么来的?是根据createSlice的第二个参数initialState的属性来的
    // 当dispatch一个action时，会根据action的type来匹配reducers中的函数，然后执行这个函数，更新state
    fetchStart: (state) => {
      // return { ...state, loading: true }; // 之前的写法，就是这样写的
      state.loading = true; // 这是新的写法，这是因为createSlice函数会自动处理immer，所以不需要再使用展开运算符
    },
    fetchSuccess: (state, action: PayloadAction<any>) => {  // PayloadAction是一个泛型类型，用于定义action的payload的类型
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {  // extraReducers是一个对象，包含了一组reducer函数，用于处理异步action，功能类似于redux-thunk
    // 使用方括号语法，将一个action type映射到一个reducer函数
    [getProductDetail.pending.type]: (state) => {
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});
