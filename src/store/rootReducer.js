import { combineReducers } from "@reduxjs/toolkit";
import locationSlice from "./slice/locationSlice";
import tokenSlice from "./slice/token";
import userSlice from "./slice/user";

const rootReducer = combineReducers({
  locationSlice,
  tokenSlice,
  userSlice,
});

export default rootReducer;
