import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';


export default function configureStore() {
  const middlewares = [
    thunkMiddleware,
    createSagaMiddleware(submitNewBudgetItem),
  ];

  return createStore(
    rootReducer,
    applyMiddleware.apply(null, middlewares)
  );
}
