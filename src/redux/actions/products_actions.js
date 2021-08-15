import * as types from "../types";
import axios from "axios";
import { products_url as url } from "../../utils/constants";

export const open_sidebar = {
  type: types.SIDEBAR_OPEN,
};
export const close_sidebar = {
  type: types.SIDEBAR_CLOSE,
};
export const get_products_success = (data) => ({
  type: types.GET_PRODUCTS_SUCCESS,
  payload: data,
});
export const get_products_begin = {
  type: types.GET_PRODUCTS_BEGIN,
};
export const get_products_error = {
  type: types.GET_PRODUCTS_ERROR,
};
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(get_products_begin);
    try {
      const response = await axios.get(url);
      dispatch(get_products_success(response.data));
    } catch (err) {
      dispatch(get_products_error);
    }
  };
};
export const fetchSingleProduct = (url) => {
  return async (dispatch) => {
    dispatch(get_single_product_begin);
    try {
      const response = await axios.get(url);
      dispatch(get_single_product_success(response.data));
    } catch (err) {
      console.log(err);
      dispatch(get_single_product_error);
    }
  };
};
export const get_single_product_success = (data) => ({
  type: types.GET_SINGLE_PRODUCT_SUCCESS,
  payload: data,
});
export const get_single_product_begin = {
  type: types.GET_SINGLE_PRODUCT_BEGIN,
};
export const get_single_product_error = {
  type: types.GET_SINGLE_PRODUCT_ERROR,
};
