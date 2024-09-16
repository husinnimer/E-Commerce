import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categories from "@store/categories/categoriesSlice";
import products from "./products/productsslice";
import cart from "./cart/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import order from "./orders/orderSlice";
// ...

const rootPresistConfig = {
  key: "root", // name
  storage, // storage type
  whiteList: ["cart , auth"], // my reducer to cach
};

const authPresistConfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};

const cartPresistConfig = {
  key: "cart",
  storage,
  whiteList: ["items"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPresistConfig, auth),
  categories,
  products,
  order,
  cart: persistReducer(cartPresistConfig, cart),
  wishlist,
});

const presistedReducer = persistReducer(rootPresistConfig, rootReducer);

const store = configureStore({
  reducer: presistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);
export { store, persistor };
