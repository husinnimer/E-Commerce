import { Col, ListGroup, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <Row>
      <Col>
        <ListGroup style={{ width: "300px" }}>
          <ListGroup.Item
            style={{
              backgroundColor: "darkgray",
              border: "none",
              padding: "10px",
            }}
            as={NavLink}
            to=""
            end
          >
            Account Info
          </ListGroup.Item>
        </ListGroup>
        <ListGroup style={{ width: "300px" }}>
          <ListGroup.Item
            style={{
              backgroundColor: "darkgray",
              border: "none",
              marginTop: "10px",
              padding: "10px",
            }}
            as={NavLink}
            to="orders"
          >
            Orders
          </ListGroup.Item>
        </ListGroup>
      </Col>
      <Col>
        <Outlet />
      </Col>
    </Row>
  );
};

export default ProfileLayout;
