import { useAppSelector } from "@store/hook";
import HeaderCounter from "../HeaderCounter/HeaderCounter";
import style from "./style.module.css";
import { getCartTotalQuantitySelector } from "@store/cart/selector";
import WishlistIcon from "@assets/svg/wishlist.svg?react";
import CartIcon from "@assets/svg/cart.svg?react";

const { headerLeftBar } = style;

const HeaderLeftBar = () => {
  const wishlistQuantity = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );

  const CartQuantity = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        page="wishlist"
        totalQuantity={wishlistQuantity}
        svgIcon={<WishlistIcon title="Wishlist" />}
        title="Wishlist"
      />
      <HeaderCounter
        page="cart"
        totalQuantity={CartQuantity}
        svgIcon={<CartIcon title="Cart" />}
        title="Cart"
      />
    </div>
  );
};

export default HeaderLeftBar;
