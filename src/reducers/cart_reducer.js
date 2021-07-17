import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, amount, color, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);
      {
        const newCartItem = {
          id: id + color,
          color,
          amount,
          price: product.price,
          name: product.name,
          image: product.images[0].url,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newCartItem] };
      }
    }

    default:
      break;
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
