import * as types from "../types";
const products_reducer = (
  state = {
    isSidebarOpen: false,
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
  },
  action
) => {
  switch (action.type) {
    case types.SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };
    case types.SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };

    case types.GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };

    case types.GET_PRODUCTS_SUCCESS: {
      const products = action.payload;
      const featured_products = products.filter(
        (product) => product.featured === true
      );

      return { ...state, products, featured_products, products_loading: false };
    }
    case types.GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    case types.GET_SINGLE_PRODUCT_BEGIN: {
      return { ...state, single_product_loading: true };
    }
    case types.GET_SINGLE_PRODUCT_SUCCESS: {
      console.log("action.payload", action.payload);
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };
    }
    case types.GET_SINGLE_PRODUCT_ERROR: {
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };
    }
    default:
      return state;
  }
};

export default products_reducer;
