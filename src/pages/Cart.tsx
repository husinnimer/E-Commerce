import { Heading } from "@components/common";
import CardItemList from "@components/ecommerce/CardItemList/CardItemList";
import CartSubTotalPrice from "@components/ecommerce/CartSubTotalPrice/CartSubTotalPrice";
import { Loading } from "@components/feedback";
import { LottieHandler } from "@components/feedback/lottieHandler/LottieHandler";
import useCart from "@hooks/useCart";

const Cart = () => {
  const {
    loading,
    error,
    products,
    userAccessToken,
    changeQuantityHandler,
    removeItemHandler,
    loadingOreder,
  } = useCart();

  return (
    <>
      <Heading title="Your Cart" />
      <Loading loading={loading} error={error} type="cart">
        {products.length ? (
          <>
            <CardItemList
              products={products}
              changeQuantityHandler={changeQuantityHandler}
              removeItemHandler={removeItemHandler}
            />
            <CartSubTotalPrice
              products={products}
              userAccessToken={userAccessToken}
            />
          </>
        ) : loadingOreder === "succeeded" ? (
          <>
            <LottieHandler
              type="success"
              message="Your Place Order Is Successfuly "
            />
          </>
        ) : (
          <LottieHandler type="trash" message="Your Cart IS Empty" />
        )}
      </Loading>
    </>
  );
};

export default Cart;
