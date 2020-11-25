import {
  SEARCH_PRODUCTS,
  GET_PRODUCT,
  CLEAR_PRODUCTS,
  SET_LOADING,
  SET_PAGE,
  SET_SIZE,
  SET_SORTTYPE,
  SET_SORTDIR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case CLEAR_PRODUCTS:
      return {
        ...state,
        products: [],
        loading: false,
      };
      case SET_PAGE:
        return {
          ...state,
          page: action.payload,
        };
    case SET_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    case SET_SORTTYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case SET_SORTDIR:
      return {
        ...state,
        sortDir: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
