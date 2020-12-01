import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CartContext from "../../../context/cart/CartContext";
import AuthContext from "../../../context/auth/AuthContext";
import "./Navbar.css";
import { LogoutOutlined } from "@ant-design/icons";

const Navbar = (props) => {
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const { totalItems } = cartContext;
  const { isAuthenticated, user, logout } = authContext;

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
            onClick={goToCart}
            style={{
              cursor: "pointer",
              margin: "auto",
              paddingRight: "3.2rem",
            }}
          >
            <i className="fas fa-shopping-cart" /> {totalItems}
          </div>
        ) : null}
        <div className="col-sm">
          {user && isAuthenticated ? (
            <div className="row" style={{ cursor: "pointer" }} onClick={logout}>
              <LogoutOutlined style={{ margin: ".3rem .5rem 0 -2rem" }} />
              Logout
            </div>
          ) : (
            <div className="row">
              <Link to="/login">Login</Link>
              <Link to="/about">About</Link>
            </div>
          )}
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
