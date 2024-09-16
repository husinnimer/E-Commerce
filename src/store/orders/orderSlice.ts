import { createSlice } from "@reduxjs/toolkit";
import { TOrderItem } from "src/types/orderItem";
import { TLoading } from "src/types/shared";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";
import { guard } from "src/types/guard";

interface IOrederSlic {
  loading: TLoading;
  error: null | string;
  orderList: TOrderItem[];
}

const initialState: IOrederSlic = {
  orderList: [],
  loading: "idle",
  error: null,
};

const orederSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetUiLoading: (state) => {
      state.loading = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // actPlaceOrder
    builder.addCase(actPlaceOrder.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actPlaceOrder.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actPlaceOrder.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
    //actGetOrders
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orderList = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetOrders };

export const { resetUiLoading } = orederSlice.actions;
export default orederSlice.reducer;
