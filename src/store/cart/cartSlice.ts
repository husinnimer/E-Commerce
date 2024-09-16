import { createSlice } from "@reduxjs/toolkit";
import { TProducts } from "src/types/products";
import actGetProductsByItems from "./act/actGetProductsByItems";
import { TLoading } from "src/types/shared";
import { guard } from "src/types/guard";

interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProducts[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
    },

    cartItemChangeQuantity: (state, action) => {
      state.items[action.payload.id] = action.payload.quantity;
    },

    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
    },

    cartItemCleanUp: (state) => {
      state.productsFullInfo = [];
    },

    cartItemRemoveAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload as TProducts[];
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actGetProductsByItems };

export const {
  addToCard,
  cartItemChangeQuantity,
  cartItemRemove,
  cartItemCleanUp,
  cartItemRemoveAfterPlaceOrder,
} = cartSlice.actions;
export default cartSlice.reducer;
