import React, { useContext, useEffect } from "react";
import CartItem from "./CartItem";
import CartChart from "./CartChart";
import CartContext from "../../context/cart/CartContext";

const Cart = () => {
  const cartContext = useContext(CartContext);
  const { items } = cartContext;

  useEffect(() => {
    // Create an scoped async function in the hook
    async function setProductArguments() {
      // await searchProducts(page, size, sortType, sortDir);
      // await setSize({ target: { value: size, text: size } });
    }
    // Execute the created function directly
    setProductArguments();

    // eslint-disable-next-line
  }, []);

  if (items.length === 0) {
    return <div>There is no item in the cart! add items to see...</div>;
  } else {
    return (
      <div className="row">
        <div className="col-md-4">
          <CartChart />
        </div>
        <div className="col-md-8 product-list" style={productStyle}>
          {items.map((item) => (
            <CartItem key={item.id} product={item} />
          ))}
        </div>
      </div>
    );
  }
};

const productStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

export default Cart;
