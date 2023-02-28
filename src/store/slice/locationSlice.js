import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
  name: "location",
  initialState: {
    location: null,
  },
  reducers: {
    UserLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { UserLocation } = locationSlice.actions;
export default locationSlice.reducer;
