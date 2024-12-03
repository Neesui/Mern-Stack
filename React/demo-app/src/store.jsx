import cartReducer from "./redux/reducers/CartReducer";
import studentReducer from "./redux/reducers/studentReducer";
import { combineReducers, legacy_createStore } from "redux";

const reducer = combineReducers({
  cart: cartReducer,
  std: studentReducer,
});

const store = legacy_createStore(reducer);
export default store;
