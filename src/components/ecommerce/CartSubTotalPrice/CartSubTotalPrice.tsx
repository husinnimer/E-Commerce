import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import { TProducts } from "src/types/products";
import { useState } from "react";
import { useAppDispatch } from "@store/hook";
import actPlaceOrder from "@store/orders/act/actPlaceOrder";
import { cartItemRemoveAfterPlaceOrder } from "@store/cart/cartSlice";

const { container } = styles;

type CartSubTotalPriceProps = {
  products: TProducts[];
  userAccessToken: string | null;
};

const CartSubTotalPrice = ({
  products,
  userAccessToken,
}: CartSubTotalPriceProps) => {
  const subTotalPrice = products.reduce((acc, curr) => {
    const price = curr.price;
    const quantity = curr.quantity;

    if (quantity && typeof quantity === "number") {
      return acc + price * quantity;
    } else {
      return acc;
    }
  }, 0);

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const modalHandler = () => {
    setShowModal(!showModal);
    setError(null);
  };

  const placeOrderHandler = () => {
    setLoading(true);
    dispatch(actPlaceOrder(subTotalPrice))
      .unwrap()
      .then(() => {
        dispatch(cartItemRemoveAfterPlaceOrder());
        setShowModal(false);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Modal show={showModal} onHide={modalHandler} style={{ color: "black" }}>
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you Sure Want To Place Order With Subtotal{" "}
          {subTotalPrice.toFixed(2)} EGP
          {!loading && error && <p style={{ marginTop: "10px" }}>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={modalHandler}>
            Close
          </Button>
          <Button
            variant="info"
            onClick={placeOrderHandler}
            style={{ color: "white" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> loading...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      <div className={container}>
        <span>SubTotal :</span>
        <span style={{ color: "green" }}>{subTotalPrice.toFixed(2)} EGP</span>
      </div>
      {userAccessToken && (
        <div className={container}>
          <span>accesUser :</span>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={modalHandler}
          >
            Palce Oredr
          </Button>
        </div>
      )}
    </>
  );
};

export default CartSubTotalPrice;
