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

const filter_reducer = (
  state = {
    all_products: [],
    filtered_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
      text: "",
      category: "all",
      company: "all",
      max_price: 0,
      min_price: 0,
      price: 0,
      color: "all",
      shipping: false,
    },
  },
  action
) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      console.log("from load product");
      const prices = action.payload.map((item) => item.price);
      const maxPrice = Math.max(...prices);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
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
    case UPDATE_FILTERS:
      console.log("hello from reducer", action.payload);
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS: {
      const { all_products } = state;
      let temppoducts = [...all_products];
      const { text, category, color, price, company, shipping } = state.filters;
      if (text) {
        temppoducts = temppoducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }
      if (company !== "all") {
        temppoducts = temppoducts.filter(
          (product) => product.company === company
        );
      }
      if (category !== "all") {
        temppoducts = temppoducts.filter(
          (product) => product.category === category
        );
      }
      if (color !== "all") {
        temppoducts = temppoducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      temppoducts = temppoducts.filter((product) => product.price <= price);
      if (shipping) {
        temppoducts = temppoducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filtered_products: temppoducts };
    }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          category: "all",
          company: "all",
          price: state.filters.max_price,
          color: "all",
          shipping: false,
        },
      };
    default:
      return state;
  }
};
export default filter_reducer;
