import { createSlice } from "@reduxjs/toolkit";
import type { User } from "../../types";

/**
 * inital State for the auth slice
 * user: null,
 * isAuthenticated: false,
 * isLoading: false,
 */
const initialState = {
  user: null as User | null,
  isAuthenticated: false as boolean,
  isLoading: false as boolean,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { reducer, actions } = authSlice;
export const { setUser, setIsAuthenticated, setIsLoading } = actions;

/**
 *  ALL ACTIONS FOR THE AUTH SLICE
 *
 */

export default authSlice;
