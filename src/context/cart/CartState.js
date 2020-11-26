import React, { useReducer } from "react";
import axios from "axios";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import {
  ADD_TO_CART,
  INCREASE_ITEM,
  DECREASE_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../types";

const CartState = (props) => {
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
    }
  };

  // Increase Items from Cart
  const increaseItems = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    const newItem = {
      ...state.items[index],
      quantity: state.items[index].quantity + 1,
    };
    if (index > -1) {
      dispatch({
        type: INCREASE_ITEM,
        payload: newItem,
      });
    }
  };

  // Decrease Items from Cart
  const decreaseItems = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    if (index > -1) {
      state.items[index].quantity = state.items[index].quantity - 1;

      if (state.items[index].quantity === 0) {
        removeFromCart(id);
      } else {
        dispatch({
          type: DECREASE_ITEM,
          payload: state.items,
        });
      }
    }
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    const index = state.items.findIndex((el) => el.id === id);
    if (index > -1) {
      state.items.splice(index, 1);
      dispatch({
        type: REMOVE_FROM_CART,
        payload: state.items,
      });
    }
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
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
