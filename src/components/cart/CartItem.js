import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartContext from "../../context/cart/CartContext";
import { Button, Badge } from "react-bootstrap";

const CartItem = ({
  product: {
    id,
    name,
    unitPrice,
    unitsInStock,
    quantity,
    categoryId,
    supplierId,
  },
}) => {
  const cartContext = useContext(CartContext);
  const { items, addToCart, decreaseItems, increaseItems } = cartContext;

  const getRandomImg = () => {
    return "https://i.pravatar.cc/300";
  };

  return (
    <div className="card text-center">
      <div className="d-flex justify-content-center">
        <img src={getRandomImg()} alt="" style={{ width: "60px" }} />
      </div>
      <p style={{ height: "2.2rem" }}>{name}</p>
      <div
        className="row d-flex justify-content-between"
        style={{ height: "4rem" }}
      >
        <h4 className="col-sm">
          {" "}
          <span style={{ fontSize: ".85rem" }}>total price : </span>{" "}
          {(unitPrice * quantity).toString().slice(0, 5)}€
        </h4>
      </div>
      <div>
        <Link to={`/product/${id}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
      <div className="d-flex justify-content-around">
        <Badge
          style={cartButtonStyle}
          pill
          variant="warning"
          onClick={() => {
            decreaseItems(id);
          }}
        >
          -1
        </Badge>
        <Button variant="light" disabled>
          {items.filter((el) => el.id === id)[0].quantity}
        </Button>
        {unitsInStock - items.filter((el) => el.id === id)[0].quantity > 0 ? (
          <Badge
            style={cartButtonStyle}
            pill
            variant="success"
            onClick={() => {
              increaseItems(id);
            }}
          >
            +1
          </Badge>
        ) : (
          <Badge style={cartButtonStyle} pill disabled={true}>
            Can't add more!
          </Badge>
        )}
      </div>
    </div>
  );
};

const cartButtonStyle = {
  height: "1.3rem",
  marginTop: "0.6rem",
  cursor: "pointer",
};

CartItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CartItem;
