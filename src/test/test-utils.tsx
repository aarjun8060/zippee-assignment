/* eslint-disable react-refresh/only-export-components */
import type { ReactElement } from "react";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../redux/store/rootReducer";

/**
 * Creates a test store with the same reducers as the app
 */
const createTestStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

/**
 * Custom render function that includes Redux Provider and Router
 */
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const store = createTestStore();

  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    store?: ReturnType<typeof createTestStore>;
  }
) => {
  if (options?.store) {
    const StoreProvider = ({ children }: { children: React.ReactNode }) => {
      if (!options.store) {
        throw new Error("StoreProvider requires a store instance.");
      }
      return (
        <BrowserRouter>
          <Provider store={options.store}>{children}</Provider>
        </BrowserRouter>
      );
    };
    // Exclude `store` from the options passed to `render` as it's not a valid option
    const { ...restOptions } = options;
    return render(ui, { wrapper: StoreProvider, ...restOptions });
  }

  return render(ui, { wrapper: AllTheProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render, createTestStore };
