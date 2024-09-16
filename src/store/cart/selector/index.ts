import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store/index";

const getCartTotalQuantitySelector = createSelector(
  (state: RootState) => state.cart.items,
  (item) => {
    const quantityValues = Object.values(item).reduce(
      (acc, curr) => acc + curr,
      0
    );
    return quantityValues;
  }
);

export { getCartTotalQuantitySelector };
