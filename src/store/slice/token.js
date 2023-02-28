import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state, action) => {
      state.token = null;
    },
  },
});

export const { saveToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
