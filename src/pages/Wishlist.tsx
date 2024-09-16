import { GridList, Heading } from "@components/common";
import Product from "@components/ecommerce/Product/Product";
import { Loading } from "@components/feedback";
import useWishlist from "@hooks/useWishlist";

const Wishlist = () => {
  const { loading, error, records } = useWishlist();

  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading loading={loading} error={error} type="product">
        <GridList
          emptyMessage="Your WishList Is Empty"
          recoreds={records}
          returnItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
