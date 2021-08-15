import { combineReducers } from "redux";
import products_reducer from "./products_reducer";
import filter_reducer from "./filter_reducer";
import cart_reducer from "./cart_reducer";

const rootReducer = combineReducers({
  products_reducer,
  filter_reducer,
  cart_reducer,
});

export default rootReducer;
