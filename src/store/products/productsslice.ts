import { createSlice } from "@reduxjs/toolkit";
import actGetProduct from "./act/actGetProduct";
import { TLoading } from "src/types/shared";
import { TProducts } from "src/types/products";
import { guard } from "src/types/guard";

interface ICategoreisState {
  recoreds: TProducts[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoreisState = {
  recoreds: [],
  loading: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    productsCleanUp: (state) => {
      state.recoreds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProduct.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProduct.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.recoreds = action.payload;
    });
    builder.addCase(actGetProduct.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export const { productsCleanUp } = productsSlice.actions;
export { actGetProduct };
export default productsSlice.reducer;
