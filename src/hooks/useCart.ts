import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemCleanUp,
  cartItemRemove,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { resetUiLoading } from "@store/orders/orderSlice";
import { useCallback, useEffect } from "react";

const useCart = () => {
  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const loadingOreder = useAppSelector((state) => state.order.loading);

  const dispatch = useAppDispatch();

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());

    return () => {
      promise.abort();
      dispatch(cartItemCleanUp());
      dispatch(resetUiLoading());
    };
  }, [dispatch]);

  return {
    loading,
    error,
    products,
    userAccessToken,
    changeQuantityHandler,
    removeItemHandler,
    loadingOreder,
  };
};

export default useCart;
