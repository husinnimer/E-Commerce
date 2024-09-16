import styles from "@components/ecommerce/ProductInfo/styles.module.css";

type TProductInfoProps = {
  title: string;
  price: number;
  quantity?: number;
  img: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  direction?: "row" | "column";
};

const ProductInfo = ({
  title,
  price,
  img,
  children,
  style,
  direction = "row",
  quantity,
}: TProductInfoProps) => {
  return (
    <>
      <div className={`${styles[`product-${direction}`]}`} style={style}>
        <div className={`${styles[`productImg-${direction}`]}`}>
          <img src={img} alt={title} />
        </div>
        <div className={`${styles[`productInfo-${direction}`]}`}>
          <h2 title={title}>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          {quantity && <h3>Quantity : {quantity}</h3>}
          {children}
        </div>
      </div>
    </>
  );
};

export default ProductInfo;
