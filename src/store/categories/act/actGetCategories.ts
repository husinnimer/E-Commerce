import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";
import { TCategories } from "src/types/categories";

type TResponse = TCategories[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunAPI) => {
    const { rejectWithValue, signal } = thunAPI;
    try {
      const response = await axios.get<TResponse>("/categories", { signal });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCategories;
