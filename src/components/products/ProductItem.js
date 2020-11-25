import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CartContext from "../../context/cart/CartContext";
import { Button, Badge } from "react-bootstrap";
import { getRoles } from "@testing-library/react";

const ProductItem = ({ product: { id, name, unitPrice, unitsInStock } }) => {
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
        <h4 className="col-sm">{unitPrice}€</h4>
        <label className="col-sm">{unitsInStock} items left!</label>
      </div>
      <div>
        <Link to={`/product/${id}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
      {items.findIndex((el) => el.id === id) > -1 ? (
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
        </div>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            addToCart({ id, name, unitPrice, unitsInStock });
          }}
        >
          Add to Cart
        </Button>
      )}
    </div>
  );
};

const cartButtonStyle = {
  height: "1.3rem",
  marginTop: "0.6rem",
  cursor: "pointer",
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductItem;
