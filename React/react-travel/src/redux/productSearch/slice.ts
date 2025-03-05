import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;  // 这里的pagination是一个对象，包含了当前页码、每页数量、总页数等信息
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    parameters: { // 这里的paramaters是一个对象，并同时定义了它的类型
      keywords: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    let url = `http://82.157.43.234:8080/api/touristRoutes?pageNumber=${parameters.nextPage}&pageSize=${parameters.pageSize}`;
    if (parameters.keywords) {
      url += `&keyword=${parameters.keywords}`;
    }
    const response = await axios.get(url);
    return {
      data: response.data,
      pagination: JSON.parse(response.headers["x-pagination"]),
    };
  }
);

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
