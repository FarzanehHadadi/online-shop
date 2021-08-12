import { combineReducers } from "redux";
import products_reducer from "./products_reducer";

const rootReducer = combineReducers({ products_reducer });

export default rootReducer;
