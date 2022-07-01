import { combineReducers } from "redux";
import userReducer from "./userReducer";
import previewReducer from "./previewReducer";

// menggabungkan berbagai reducer
export default combineReducers({
  userReducer : userReducer,
  previewReducer : previewReducer,
});
