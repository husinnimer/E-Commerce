import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";
import { TProducts } from "src/types/products";

type TResponse = TProducts[];

const actGetProduct = createAsyncThunk(
  "products/actGetCategories",
  async (prefix: string, thunAPI) => {
    const { rejectWithValue, signal } = thunAPI;
    try {
      const response = await axios.get<TResponse>(
        `/products?cat_prefix=${prefix}`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetProduct;
