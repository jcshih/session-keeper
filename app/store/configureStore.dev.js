import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import rootReducer from '../modules/reducer';
import thunk from 'redux-thunk';
import storage from '../utils/storage';

const enhancer = compose(
  applyMiddleware(thunk),
  storage(),
  window.devToolsExtension ? window.devToolsExtension() : nope => nope
);

export default function (initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../modules/reducer', () => {
      const nextRootReducer = require('../modules/reducer');
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
