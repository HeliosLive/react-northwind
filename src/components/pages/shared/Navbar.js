import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CartContext from "../../../context/cart/CartContext";
import "./Navbar.css";

const Navbar = (props) => {
  const cartContext = useContext(CartContext);
  const { items, totalItems } = cartContext;

  const { icon, title } = props;
  const history = useHistory();

  const goToHome = (event) => {
    history.push("/");
  };

  const goToCart = (event) => {
    history.push("/cart");
  };

  return (
    <nav className="navbar d-flex justify-content-between">
      <h2 style={{ cursor: "pointer" }} onClick={goToHome}>
        <i className={icon} /> {title}
      </h2>
      <div className="row">
        {totalItems > 0 ? (
          <div
            className="col-sm"
            onClick={goToCart}
            style={{ cursor: "pointer" }}
          >
            <i className="fas fa-shopping-cart" /> {totalItems}
          </div>
        ) : null}
        <div className="col-sm">
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Brabant Food Delivery",
  icon: "fas fa-pizza-slice",
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default Navbar;
