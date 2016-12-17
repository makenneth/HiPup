import { combineReducers } from "redux";
import { reducer as reduxAsyncConnect } from "redux-async-connect";
import geolocation from "./geolocation";
import auth from "./auth";
import form from "./form";
import groupEvents from "./groupEvents";
import groups from "./groups";
import success from "./success";
import tags from "./tags";

export default combineReducers({
  reduxAsyncConnect,
  geolocation,
  form,
  auth,
  groups,
  groupEvents,
  success,
  tags
});
