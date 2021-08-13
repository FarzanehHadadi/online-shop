import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../types";
import { useEffect } from "react";

export const setGridView = {
  type: SET_GRIDVIEW,
};

export const setListView = { type: SET_LISTVIEW };

export const updateSort = (e) => ({
  type: UPDATE_SORT,
  payload: e.target.value,
});

// useEffect(() => {
//   dispatch({ type: FILTER_PRODUCTS });
//   dispatch({ type: SORT_PRODUCTS });
// }, [state.sort, state.filters]);
// //  }, [ products,state.sort, state.filters]);

export const updateFilters = () => {
  return (e, dispatch) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent;
    }
    if (name === "color") {
      value = e.target.getAttribute("data-color");
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
};
export const clearFilters = {
  type: CLEAR_FILTERS,
};
export const load_products = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});
