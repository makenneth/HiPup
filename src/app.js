import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import { ReduxAsyncConnect } from "redux-async-connect";
import store from "./redux/store";
import getRoutes from "./routes";

if (process.env.NODE_ENV !== "production") {
  window.React = React;
}

document.addEventListener("DOMContentLoaded", () => {
  render(<Provider store={store}>
    <Router
      history={browserHistory}
      render={props => <ReduxAsyncConnect {...props} />}
    >
      {getRoutes()}
    </Router>
  </Provider>, document.getElementById("root"));
});
