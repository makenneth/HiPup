import 'babel-polyfill';
import 'whatwg-fetch';
// import 'vendor/font-awesome/scss/font-awesome.scss';
import 'assets/scss/reset.scss';
import 'assets/scss/fonts.scss';
import 'assets/scss/app.scss';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import { Iterable } from 'immutable';
import createStore from './redux/store';
import getRoutes from './routes';
import { updateLocation } from 'redux/modules/geolocation';

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
  if (window.console && console.log) {
    const old = console.log;
    console.log = function() {
      const args = Array.prototype.slice.call(arguments).map(arg => (
        Iterable.isIterable(arg) ? arg.toJS() : arg
      ));
      old(...args);
    }
  }
}

const store = createStore();

document.addEventListener('DOMContentLoaded', () => {
  updateLocation(store);
  render(<Provider store={store}>
    <Router
      history={browserHistory}
      render={props => <ReduxAsyncConnect {...props} />}
    >
      {getRoutes(store)}
    </Router>
  </Provider>, document.getElementById('root'));
});
