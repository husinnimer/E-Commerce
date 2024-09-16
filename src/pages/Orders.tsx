import { Heading } from "@components/common";
import ProductInfo from "@components/ecommerce/ProductInfo/ProductInfo";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetOrders, resetUiLoading } from "@store/orders/orderSlice";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { TProducts } from "src/types/products";

const Orders = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const poromise = dispatch(actGetOrders());

    return () => {
      poromise.abort();
      dispatch(resetUiLoading());
    };
  }, [dispatch]);

  const { orderList } = useAppSelector((state) => state.order);
  const [showModal, setShowModal] = useState(false);
  const [selectProduct, setSelectProduct] = useState<TProducts[]>([]);

  const handleProduct = (id: number) => {
    const productDetails = orderList.find((el) => el.id === id);
    const newItems = productDetails?.items ?? [];
    setSelectProduct((prev) => [...prev, ...newItems]);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        animation={false}
        style={{ color: "black" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectProduct.map((el) => (
            <ProductInfo
              quantity={el.quantity}
              key={el.id}
              title={el.title}
              price={el.price}
              img={el.img}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ textAlign: "center" }}>
        <Heading title="Your Orders" />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order Number </th>
            <th> Items </th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((el) => {
            return (
              <>
                <tr key={el.id}>
                  <td>#{el.id}</td>
                  <td>
                    {el.items.length} items {"/"}{" "}
                    <span
                      style={{
                        textDecoration: "underLine",
                        cursor: "pointer",
                      }}
                      onClick={() => handleProduct(el.id)}
                    >
                      Product Details
                    </span>
                  </td>
                  <td>{el.subTotal.toFixed(2)} Egp</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Orders;
