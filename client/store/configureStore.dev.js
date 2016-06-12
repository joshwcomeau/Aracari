import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';
import submitNewBudgetItem from 'sagas/submit-new-budget-item.saga';
import DevTools from 'components/DevTools';


export default function configureStore() {
  // On the client, we pass in an array of sockets.
  // We will create one middleware step for each one.
  // When actions are dispatched, each middleware will check its middleware.
  // if the action has specified its namespace as a remote, the socket will
  // emit an action on that socket with the action data, along with some
  // mixed-in extras (like the current user's auth data.)

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunkMiddleware,
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware.apply(this, middlewares),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(submitNewBudgetItem);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
