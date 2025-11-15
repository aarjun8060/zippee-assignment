import { combineReducers } from "@reduxjs/toolkit";

/**
 * all reducers here
 * auth: authSlice.reducer,
 * character: characterSlice.reducer,
 */
import {
  reducer as authReducer,
} from "../slices/auth";
import { reducer as characterReducer } from "../slices/character";


export const rootReducer = combineReducers({
  auth: authReducer,
  character: characterReducer,
});
