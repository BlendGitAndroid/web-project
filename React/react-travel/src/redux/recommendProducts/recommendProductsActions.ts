import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_RECOMMEND_PRODUCTS_START =
  "FETCH_RECOMMEND_PRODUCTS_START"; // 正在调用推荐信息api
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS =
  "FETCH_RECOMMEND_PRODUCTS_SUCCESS"; // 推荐信息api调用成功
export const FETCH_RECOMMEND_PRODUCTS_FAIL =
  "FETCH_RECOMMEND_PRODUCTS_FAIL"; // 推荐信息api调用失败

interface FetchRecommendProductStartAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_START
}

interface FetchRecommendProductSuccessAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
  payload: any,
}

interface FetchRecommendProductFailAction {
  type: typeof FETCH_RECOMMEND_PRODUCTS_FAIL,
  payload: any
}

export type RecommendProductAction =
  | FetchRecommendProductStartAction
  | FetchRecommendProductSuccessAction
  | FetchRecommendProductFailAction;

// 定义一个工厂函数，返回一个action对象
export const fetchRecommendProductStartActionCreator = (): FetchRecommendProductStartAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_START,
  };
};

export const fetchRecommendProductSuccessActionCreator = (data): FetchRecommendProductSuccessAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: data
  }
}

export const fetchRecommendProductFailActionCreator = (error): FetchRecommendProductFailAction => {
  return {
    type: FETCH_RECOMMEND_PRODUCTS_FAIL,
    payload: error
  }
}


// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
// 这个函数返回一个ThunkAction，这是一个异步操作，用于处理异步逻辑（如从服务器获取数据）并根据操作结果分发相应的Redux actions。
export const giveMeDataActionCreator = (): ThunkAction<
  void, // 异步函数无需返回内容，所以是void
  RootState,  // store的state类型
  unknown,  // 额外的参数
  RecommendProductAction  // action的类型
> => async (dispatch, getState) => {  // 这里的dispatch和getState是redux-thunk传入的
  // dispatch的作用是将action发送给reducer
  dispatch(fetchRecommendProductStartActionCreator());
  try {
    const { data } = await axios.get(
      "http://82.157.43.234:8080/api/productCollections"
    );
    dispatch(fetchRecommendProductSuccessActionCreator(data));
  } catch (error: any) {
    dispatch(fetchRecommendProductFailActionCreator(error.message));
  }
};

/**
 * redux-thunk的源码
 * 如果没有redux-thunk，那么redux只能处理普通的action，即一个js对象。
 * dispatch后的action会被redux-thunk拦截，如果action是一个函数，那么redux-thunk会执行这个函数，并传入dispatch和getState作为参数。
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