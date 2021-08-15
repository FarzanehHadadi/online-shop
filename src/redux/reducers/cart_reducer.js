import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../types";
const readLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    console.log("cart", cart);
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};
const initialState = {
  cart: readLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};
const cart_reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id, amount, color, product } = action.payload;
      const tempItem = state.cart.find((item) => {
        return item.id === id + color;
      });
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
    case REMOVE_CART_ITEM: {
      const tempCrt = state.cart.filter((item) => item.id !== action.payload);
      return { ...state, cart: tempCrt };
    }
    case CLEAR_CART: {
      return { ...state, cart: [] };
    }
    case TOGGLE_CART_ITEM_AMOUNT: {
      let { id, value } = action.payload;

      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value > item.max) {
            return { ...item, amount: item.max };
          }
          if (value < 1) {
            value = 1;
          }
          return { ...item, amount: value };
        } else {
          return item;
        }
      });
      return { ...state, cart: tempCart };
    }
    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          const { amount, price } = item;

          total.total_items += amount;
          total.total_amount += price * amount;
          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_amount, total_items };
    }
    default:
      return state;
  }
};

export default cart_reducer;
