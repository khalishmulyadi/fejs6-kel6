import { combineReducers } from "redux";
import userReducer from "./userReducer";

// menggabungkan berbagai reducer
export default combineReducers({
  userReducer: userReducer,
});
