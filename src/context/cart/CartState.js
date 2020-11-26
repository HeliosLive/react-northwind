import React, { useReducer, useContext } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import {
  ADD_TO_CART,
  INCREASE_ITEM,
  DECREASE_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../types";
import AlertContext from "../alert/AlertContext";

const CartState = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const callAlerts = (message, type) => {
    setAlert(message, type);
  };

  const initialState = {
    items: [],
    totalItems: 0,
  };

  const [state, dispatch] = useReducer(CartReducer, initialState);

  // Add to Cart
  const addToCart = (params) => {
    const { id, name, supplierId, categoryId } = params;
    const index = state.items.findIndex((el) => el.id === id);
    if (index > -1) {
      increaseItems(id);
    } else {
      const newItem = { id, name, supplierId, categoryId, quantity: 1 };
      dispatch({
        type: ADD_TO_CART,
        payload: newItem,
      });
      callAlerts(`${name} added successfully !`, "success");
    }
  };

  // Increase Items from Cart
  const increaseItems = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    if (index > -1) {
      const newItem = {
        ...state.items[index],
        quantity: state.items[index].quantity + 1,
      };
      dispatch({
        type: INCREASE_ITEM,
        payload: newItem,
      });
      callAlerts(`${newItem.name} increased by 1 !`, "info");
    }
  };

  // Decrease Items from Cart
  const decreaseItems = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    if (index > -1) {
      const newItem = {
        ...state.items[index],
        quantity: state.items[index].quantity - 1,
      };

      if (newItem.quantity === 0) {
        removeFromCart(id);
      } else {
        dispatch({
          type: DECREASE_ITEM,
          payload: newItem,
        });
        callAlerts(`${newItem.name} decreased by 1 !`, "warning");
      }
    }
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    callAlerts(`${state.items[index].name}removed from cart!`, "error");
    dispatch({
      type: REMOVE_FROM_CART,
      payload: id,
    });
  };

  // Clear Cart
  const ClearCart = () => {
    dispatch({
      type: CLEAR_CART,
      payload: [],
    });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems: state.items.length,
        increaseItems,
        decreaseItems,
        addToCart,
        ClearCart,
        removeFromCart,
        callAlerts,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
