import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/products";
import { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "ProductsIds";
type TResponse = TProducts[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunAPI) => {
    const { rejectWithValue, signal, getState } = thunAPI;
    const { auth } = getState() as RootState;
    try {
      const userWishlist = await axios.get<{ productId: number }[]>(
        `/wishlist?userId=${auth.user?.id}`
      );

      if (!userWishlist.data.length) {
        return { data: [], dataType: "empty" };
      }

      if (dataType === "ProductsIds") {
        const concanatedItemId = userWishlist.data.map((el) => el.productId);

        return { data: concanatedItemId, dataType: "productsIds" };
      } else {
        const concanatedItemId = userWishlist.data
          .map((el) => `id=${el.productId}`)
          .join("&");

        const response = await axios.get<TResponse>(
          `/products?${concanatedItemId}`,
          { signal }
        );

        return { data: response.data, dataType: "productsFullInfo" };
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
