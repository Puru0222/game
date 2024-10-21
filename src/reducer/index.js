import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import updateUserReducer from "../slices/updateUserSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: updateUserReducer,
});

export default rootReducer;
