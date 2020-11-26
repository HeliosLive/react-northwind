import React, { useReducer } from "react";
import axios from "axios";
import ProductContext from "./ProductContext";
import ProductReducer from "./ProductReducer";
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

const ProductState = (props) => {
  const initialState = {
    products: [],
    product: {},
    loading: false,
    page: 1,
    pageOptions: [],
    size: 30,
    sizeOptions: [5, 10, 20, 30, 50, 100],
    sortType: "price",
    sortTypeOptions: ["name", "price", "random"],
    sortDir: "ASC",
    sortDirOptions: ["DESC", "ASC"],
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // Search Products
  const searchProducts = async (params) => {
    const { name, supplierId, categoryId } = params;
    setLoading();
    let filteredArray = [];

    const queryParams = new URLSearchParams();
    if (supplierId) {
      queryParams.append("supplierId", supplierId);
    }
    if (categoryId) {
      queryParams.append("categoryId", categoryId);
    }
    const resp = await axios.get(`https://northwind.now.sh/api/products`);

    if (categoryId) {
      filteredArray = resp.data.filter(function (products) {
        return (
          categoryId.filter(function (selections) {
            return selections === products.categoryId.toString();
          }).length !== 0
        );
      });
    }
    // const resp = await axios.get(`https://northwind.now.sh/api/products`, {
    //   params: queryParams,
    // });

    dispatch({
      type: SEARCH_PRODUCTS,
      payload: filteredArray.length > 0 ? filteredArray : resp.data,
    });
  };

  // Get Product
  const getProduct = async (productId) => {
    setLoading();

    const resp = await axios.get(
      `https://northwind.now.sh/api/products/${productId}`
    );

    dispatch({
      type: GET_PRODUCT,
      payload: resp.data,
    });
  };

  // Clear products
  const clearProducts = () => dispatch({ type: CLEAR_PRODUCTS });

  // set page
  const setPage = (page) => {
    dispatch({ type: SET_PAGE, payload: parseInt(page.target.text) });
  };
  // set size
  const setSize = (size) => {
    setPage({ target: { text: 1 } });
    dispatch({ type: SET_SIZE, payload: parseInt(size.target.value) });
  };
  // set sort type
  const setSortType = (type) =>
    dispatch({ type: SET_SORTTYPE, payload: type.target.value });
  // set sort dir
  const setSortDir = (dir) =>
    dispatch({ type: SET_SORTDIR, payload: dir.target.value });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ProductContext.Provider
      value={{
        products: state.products.slice(
          (state.page - 1) * state.size,
          state.page * state.size
        ),
        product: state.product,
        page: state.page,
        pageOptions: state.products.length / state.size,
        size: state.size,
        sizeOptions: state.sizeOptions,
        sortType: state.sortType,
        sortTypeOptions: state.sortTypeOptions,
        sortDir: state.sortDir,
        sortDirOptions: state.sortDirOptions,
        loading: state.loading,
        searchProducts,
        clearProducts,
        getProduct,
        setPage,
        setSize,
        setSortType,
        setSortDir,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
