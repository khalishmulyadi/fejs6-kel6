import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers/reducer";

const allEnhancer = compose(applyMiddleware(thunk));

const store = createStore(combineReducers, allEnhancer);

export default store;
