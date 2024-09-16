import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import axiosErrorHandler from "@util/axiosErrorHandler";
import axios from "axios";

const actPlaceOrder = createAsyncThunk(
  "orders/actPlaceOrder",
  async (subTotal: number, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { cart, auth } = getState() as RootState;

    const orderItem = cart.productsFullInfo.map((el) => {
      return {
        id: el.id,
        title: el.title,
        price: el.price,
        img: el.img,
        quantity: cart.items[el.id],
      };
    });

    try {
      const res = await axios.post("/orders", {
        userId: auth.user?.id,
        items: orderItem,
        subTotal,
      });
      return res.data;
    } catch (error) {
      rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actPlaceOrder;
