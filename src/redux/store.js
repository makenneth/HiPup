import { createStore, applyMiddleware } from "redux";
import reducer from "./modules/reducer";
import middleware from "./middleware";

let createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer);

export default store;
