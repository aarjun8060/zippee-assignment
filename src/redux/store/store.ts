import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

/**
 * @returns Store component
 * This component is used to display the store
 */
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
