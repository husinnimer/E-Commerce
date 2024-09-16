import { TProducts } from "src/types/products";
import CartItem from "../CardItem/CardItem";

type CardItemListProps = {
  products: TProducts[];
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CardItemList = ({
  products,
  changeQuantityHandler,
  removeItemHandler,
}: CardItemListProps) => {
  const renderList = products.map((el) => (
    <CartItem
      key={el.id}
      {...el}
      changeQuantityHandler={changeQuantityHandler}
      removeItemHandler={removeItemHandler}
    />
  ));

  return <div>{renderList}</div>;
};

export default CardItemList;
