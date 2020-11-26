import {
  SEARCH_CATEGORY,
  SET_FILTER_CATEGORY,
  RESET_FILTER_CATEGORY,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_FILTER_CATEGORY:
      return {
        ...state,
        filteredCategories: state.categories.filter((ctg) => {
          return (
            action.payload.filter(function (selections) {
              return selections === ctg.id;
            }).length !== 0
          );
        }),
      };
    case RESET_FILTER_CATEGORY:
      return {
        ...state,
        filteredCategories: [],
      };
    default:
      return state;
  }
};
