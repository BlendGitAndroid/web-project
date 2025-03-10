import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { stat } from "fs";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (paramaters: {
    email: string,
    password: string,
  }, thunkAPI) => {
    // const { data } = await axios.post(
    //   `http://82.157.43.234:8080/auth/login`, {
    //   email: paramaters.email,
    //   password: paramaters.password
    // }
    // );
    // return data.token;
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJCbGVuZCIsImlhdCI6MTUxNjIzOTAyMn0.wW5fuMjgzTqcvRIWqfqNrycnbqQtS-9h0GZ846VjtIM";
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 这里直接调用同步的action,调用的时候直接调用dispatch(userSlice.actions.logOut())
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
