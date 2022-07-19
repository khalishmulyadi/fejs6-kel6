import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

// menggabungkan berbagai reducer
export default combineReducers({
  userReducer: userReducer,
  productReducer: productReducer,
});
