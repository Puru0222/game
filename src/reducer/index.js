import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import updateUserReducer from "../slices/updateUserSlice";
import challengeReducer from "../slices/gameslices/challengeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: updateUserReducer,
  challenge: challengeReducer,
});

export default rootReducer;
