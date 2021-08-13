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

export const setGridView = {
  type: SET_GRIDVIEW,
};
export const sortProducts = {
  type: SORT_PRODUCTS,
};
export const filterProducts = {
  type: FILTER_PRODUCTS,
};
export const setListView = { type: SET_LISTVIEW };

export const updateSort = (value) => ({
  type: UPDATE_SORT,
  payload: value,
});

export const updateFilters = (name, value) => ({
  type: UPDATE_FILTERS,
  payload: { name, value },
});

// export const updateFilters = () => {
//   return (dispatch, e) => {
//     console.log("e from updateFilters", e);
//     const name = e.target.name;
//     let value = e.target.value;
//     if (name === "category") {
//       value = e.target.textContent;
//     }
//     if (name === "color") {
//       value = e.target.getAttribute("data-color");
//     }
//     if (name === "price") {
//       value = Number(value);
//     }
//     if (name === "shipping") {
//       value = e.target.checked;
//     }
//     dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
//   };
// };
export const clearFilters = {
  type: CLEAR_FILTERS,
};
export const load_products = (products) => ({
  type: LOAD_PRODUCTS,
  payload: products,
});
