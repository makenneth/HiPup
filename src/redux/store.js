import { createStore, applyMiddleware, compose } from 'redux';
import middleware from './middleware';

const enhancers = [middleware];

if (process.ENV.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  const logger = createLogger({
    stateTransformer: (state) => {
      return state && Object.keys(state).reduce((h, r) => {
        if (r === 'reduxAsyncConnect') {
          h[r] = state[r];
        } else {
          h[r] = state[r].toJS();
        }
        return h;
      }, {});
    }
  });
  enhancers.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...enhancers)(createStore);

export default function createFinalStore() {
  const reducer = require('./modules/reducer');
  const store = createStoreWithMiddleware(reducer);

  if (process.ENV.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(require('./modules/reducer'))
    );
  }

  return store;
}
