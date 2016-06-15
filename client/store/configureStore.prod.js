import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';
import submitNewBudgetItem from 'sagas/submit-new-budget-item.saga';
import submitNewCategory from 'sagas/submit-new-category.saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    thunkMiddleware,
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    applyMiddleware.apply(null, middlewares)
  );

  sagaMiddleware.run(submitNewBudgetItem);
  sagaMiddleware.run(submitNewCategory);

  return store;
}
