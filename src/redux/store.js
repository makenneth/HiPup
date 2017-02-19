import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import middleware from './middleware';

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

const createStoreWithMiddleware = applyMiddleware(middleware, logger)(createStore);

export default function createFinalStore() {
  const reducer = require('./modules/reducer');
  const store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    module.hot.accept('./modules/reducer', () =>
      store.replaceReducer(require('./modules/reducer'))
    );
  }

  return store;
}
