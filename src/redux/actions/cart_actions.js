import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../types";

export const addToCart = (id, color, amount, product) => ({
  type: ADD_TO_CART,
  payload: { id, amount, color, product },
});

export const toggleAmount = (id, value) => ({
  type: TOGGLE_CART_ITEM_AMOUNT,
  payload: { id, value },
});

export const removeItem = (id) => ({ type: REMOVE_CART_ITEM, payload: id });

export const clearCart = { type: CLEAR_CART };

export const countCartTotals = { type: COUNT_CART_TOTALS };
