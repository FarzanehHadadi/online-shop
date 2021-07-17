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
      if (tempItem) {
        const tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.max) newAmount = item.max;
            return { ...item, amount: newAmount };
          } else {
            return item;
          }
        });
        return { ...state, cart: tempCart };
      } else {
        const newCartItem = {
          id: id + color,
          color,
          amount,
          max: product.stock,
          price: product.price,
          name: product.name,
          image: product.images[0].url,
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
