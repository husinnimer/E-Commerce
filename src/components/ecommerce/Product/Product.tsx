import { Button, Modal, Spinner } from "react-bootstrap";
import styles from "./style.module.css";
import { TProducts } from "src/types/products";
import { useAppDispatch } from "@store/hook";
import { addToCard } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
import Like from "@assets/svg/like.svg?react";
import actLikeToogle from "@store/wishlist/act/actLikeToogle";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { useNavigate } from "react-router-dom";
import ProductInfo from "../ProductInfo/ProductInfo";

const { wishListBtn } = styles;

const Product = memo(
  ({
    id,
    title,
    price,
    img,
    max,
    quantity,
    isLisked,
    isAuthantication,
  }: TProducts) => {
    const dispatch = useAppDispatch();
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const currentRemainingQuantity = max - (quantity ?? 0);
    const fullQuantity = currentRemainingQuantity === 0 ? true : false;

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
      if (!isBtnDisabled) {
        return;
      }

      const debounce = setTimeout(() => {
        setIsBtnDisabled(false);
      }, 300);

      return () => clearTimeout(debounce);
    }, [isBtnDisabled]);

    const handlerAddToCard = () => {
      dispatch(addToCard(id));
      setIsBtnDisabled(true);
    };

    const likeToogleHandler = () => {
      if (isAuthantication) {
        if (!isLoading) {
          setIsLoading(true);
          dispatch(actLikeToogle(id))
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
        }
      } else {
        setShowModal(true);
      }
    };

    const goLogin = () => {
      navigate("/login");
    };

    return (
      <>
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          style={{ color: "black" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You Need To Login First To Add This Item To WishList
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="success" onClick={goLogin}>
              Login ?
            </Button>
          </Modal.Footer>
        </Modal>

        <ProductInfo
          title={title}
          img={img}
          price={price}
          quantity={quantity as number}
        >
          <div className={wishListBtn} onClick={likeToogleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLisked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <p>
            {fullQuantity
              ? "You Reach To The Limit"
              : `You Can Add ${currentRemainingQuantity}`}
          </p>
          <Button
            variant="info"
            style={{ color: "white", width: "100%" }}
            onClick={handlerAddToCard}
            disabled={isBtnDisabled || fullQuantity}
          >
            {isBtnDisabled ? (
              <>
                <Spinner animation="border" size="sm" variant="primary" />{" "}
                Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </ProductInfo>
      </>
    );
  }
);

export default Product;
