import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "src/types/shared";
import actAuthRegiester from "./act/actAuthRegiester";
import { guard } from "src/types/guard";
import actAuthLogin from "./act/actAuthLogin";

interface IAuthSlice {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  accessToken: string | null;
  loading: TLoading;
  error: string | null;
}

const initialState: IAuthSlice = {
  user: null,
  accessToken: null,
  loading: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reastUi: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    logOut: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    //regisester
    builder.addCase(actAuthRegiester.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthRegiester.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthRegiester.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
    //login
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      if (guard(action.payload)) {
        state.error = action.payload;
      }
    });
  },
});

export { actAuthRegiester };
export const { reastUi, logOut } = authSlice.actions;

export default authSlice.reducer;
