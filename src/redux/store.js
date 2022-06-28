import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import combineReducers from "./reducers/reducer";

const allEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const store = createStore(combineReducers, allEnhancer);

export default store;
