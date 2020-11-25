import {
  ADD_TO_CART,
  INCREASE_ITEM,
  DECREASE_ITEM,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: state.items.concat(action.payload),
      };
    case INCREASE_ITEM:
      return {
        ...state,
        items: action.payload,
      };
    case DECREASE_ITEM:
      return {
        ...state,
        items: action.payload,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: action.payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
