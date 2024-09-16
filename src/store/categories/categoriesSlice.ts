import { createSlice } from "@reduxjs/toolkit";
import actGetCategories from "./act/actGetCategories";
import { TLoading } from "src/types/shared";
import { TCategories } from "src/types/categories";
import { guard } from "src/types/guard";

interface ICategoreisState {
  recoreds: TCategories[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICategoreisState = {
  recoreds: [],
  loading: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesCleanUp: (state) => {
      state.recoreds = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCategories.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.recoreds = action.payload;
    });
    builder.addCase(actGetCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetCategories };

export const { categoriesCleanUp } = categoriesSlice.actions;
export default categoriesSlice.reducer;
