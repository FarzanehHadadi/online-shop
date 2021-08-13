import { combineReducers } from "redux";
import products_reducer from "./products_reducer";
import filter_reducer from "./filter_reducer";

const rootReducer = combineReducers({ products_reducer, filter_reducer });

export default rootReducer;
