import {
  actGetCategories,
  categoriesCleanUp,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { useEffect } from "react";

const useCategories = () => {
  const { recoreds, loading, error } = useAppSelector(
    (state) => state.categories
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(actGetCategories());

    return () => {
      promise.abort();
      dispatch(categoriesCleanUp());
    };
  }, [dispatch]);

  return { recoreds, loading, error };
};

export default useCategories;
