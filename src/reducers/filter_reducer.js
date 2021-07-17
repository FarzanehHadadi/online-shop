import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      let temp_products = [...filtered_products];
      if (sort === "price-lowest") {
        temp_products = temp_products.sort(
          (cur, next) => cur.price - next.price
        );
      }
      if (sort === "price-highest") {
        temp_products = temp_products.sort(
          (cur, next) => next.price - cur.price
        );
      }
      if (sort === "name-a") {
        temp_products = temp_products.sort((cur, next) =>
          cur.name.localeCompare(next.name)
        );
      }
      if (sort === "name-z") {
        temp_products = temp_products.sort((cur, next) =>
          next.name.localeCompare(cur.name)
        );
      }
      return { ...state, filtered_products: temp_products };
    }
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
