import { createSlice } from "@reduxjs/toolkit";
import actLikeToogle from "./act/actLikeToogle";
import actGetWishlist from "./act/actGetWishlist";
import { TLoading } from "src/types/shared";
import { TProducts } from "src/types/products";
import { guard } from "src/types/guard";
import { logOut } from "@store/auth/authSlice";

interface IWishlist {
  itemsId: number[];
  productsFullInfo: TProducts[];
  error: null | string;
  loading: TLoading;
}

const initialState: IWishlist = {
  itemsId: [],
  productsFullInfo: [],
  error: null,
  loading: "idle",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    recordsCleanUp: (state) => {
      state.productsFullInfo = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(actLikeToogle.pending, (state) => {
      state.error = null;
    });
    builder.addCase(actLikeToogle.fulfilled, (state, action) => {
      if (action.payload.type === "add") {
        state.itemsId.push(action.payload.id);
      } else {
        state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
        state.productsFullInfo = state.productsFullInfo.filter(
          (el) => el.id !== action.payload.id
        );
      }
    });
    builder.addCase(actLikeToogle.rejected, (state, action) => {
      if (action.payload && typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
    //act Get WishList
    builder.addCase(actGetWishlist.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWishlist.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.dataType === "productsFullInfo") {
        state.productsFullInfo = action.payload.data as TProducts[];
      } else if (action.payload.dataType === "productsIds") {
        state.itemsId = action.payload.data as number[];
      }
    });
    builder.addCase(actGetWishlist.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
    //when logOut

    builder.addCase(logOut, (state) => {
      state.itemsId = [];
      state.productsFullInfo = [];
    });
  },
});

export { actLikeToogle, actGetWishlist };
export const { recordsCleanUp } = wishlistSlice.actions;
export default wishlistSlice.reducer;
