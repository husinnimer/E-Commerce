import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TProducts } from "src/types/products";
import axios from "axios";
import axiosErrorHandler from "@util/axiosErrorHandler";

type TResponse = TProducts[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState, signal } = thunkAPI;
    const { cart } = getState() as RootState;

    const itemId = Object.keys(cart.items);

    if (!itemId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concanitatedItemId = itemId.map((el) => `id=${el}`).join("&");
      const response = await axios.get<TResponse>(
        `/products?${concanitatedItemId}`,
        { signal }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProductsByItems;
