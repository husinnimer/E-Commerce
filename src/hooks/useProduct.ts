import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetProduct, productsCleanUp } from "@store/products/productsslice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const useProduct = () => {
  const { recoreds, loading, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  const params = useParams();
  const paramsPrefix = params.prefix;
  const items = useAppSelector((state) => state.cart.items);
  const itemsLikedId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const recordFullInfo = recoreds.map((el) => ({
    ...el,
    quantity: items[el.id] || 0,
    isLisked: itemsLikedId.includes(el.id),
    isAuthantication: userAccessToken ? true : false,
  }));

  useEffect(() => {
    const promise = dispatch(actGetProduct(params.prefix as string));

    //when you leave the page clean the recordes
    return () => {
      dispatch(productsCleanUp());
      promise.abort();
    };
  }, [dispatch, params]);

  return { loading, error, recordFullInfo, paramsPrefix };
};

export default useProduct;
