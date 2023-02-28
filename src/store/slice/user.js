import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    email: null,
  },
  reducers: {
    saveUserData: (state, action) => {
      console.log(action.payload);
      state.userName = action.payload.userName;
      state.email = action.payload.email;
    },
    removeUserData: (state, action) => {
      state.userName = null;
      state.email = null;
    },
  },
});

export const { saveUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;
