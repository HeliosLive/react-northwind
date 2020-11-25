import React, { useReducer } from "react";
import axios from "axios";
import CategoryContext from "./CategoryContext";
import CategoryReducer from "./CategoryReducer";
import {
  SEARCH_CATEGORY,
  SET_FILTER_CATEGORY,
  RESET_FILTER_CATEGORY,
} from "../types";

const CategoryState = (props) => {
  const initialState = {
    categories: [],
    filteredCategories: [],
  };

  const [state, dispatch] = useReducer(CategoryReducer, initialState);

  // Search Categories
  const searchCategories = async () => {
    const resp = await axios.get(`https://northwind.now.sh/api/categories`);
    dispatch({
      type: SEARCH_CATEGORY,
      payload: resp.data,
    });
  };

  // Set Filtered Categories
  const setFilteredCategories = async (selectedCategories) => {
    if (selectedCategories.length > 0) {
      const filteredArray = state.categories.filter(function (Categories) {
        return (
          selectedCategories.filter(function (selections) {
            return selections == Categories.id;
          }).length !== 0
        );
      });

      dispatch({
        type: SET_FILTER_CATEGORY,
        payload: filteredArray,
      });
    } else {
      clearFilteredCategories();
    }
  };

  // Clear Filtered Categories
  const clearFilteredCategories = () =>
    dispatch({ type: RESET_FILTER_CATEGORY });

  return (
    <CategoryContext.Provider
      value={{
        categories: state.categories,
        filteredCategories: state.filteredCategories,
        searchCategories,
        setFilteredCategories,
        clearFilteredCategories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryState;
