import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetWishlist, recordsCleanUp } from "@store/wishlist/wishlistSlice";
import { useEffect } from "react";

const useWishlist = () => {
  const dispatch = useAppDispatch();
  const { loading, error, productsFullInfo } = useAppSelector(
    (state) => state.wishlist
  );

  const items = useAppSelector((state) => state.cart.items);

  const records = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLisked: true,
    isAuthantication: true,
  }));

  useEffect(() => {
    const promise = dispatch(actGetWishlist("productsFullInfo"));

    return () => {
      promise.abort();
      dispatch(recordsCleanUp());
    };
  }, [dispatch]);

  return { loading, error, records };
};

export default useWishlist;
