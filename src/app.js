import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import store from './redux/store';
import getRoutes from './routes';
import { updateLocation } from 'redux/modules/geolocation';

if (process.env.NODE_ENV !== 'production') {
  window.React = React;
}

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
