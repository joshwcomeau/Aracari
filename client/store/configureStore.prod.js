import { createStore, applyMiddleware, compose } from 'redux';
import persistState from 'redux-localstorage'
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';
import submitNewBudgetItem from 'sagas/submit-new-budget-item.saga';
import submitNewCategory from 'sagas/submit-new-category.saga';
import submitUpdatedCategory from 'sagas/submit-updated-category.saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    thunkMiddleware,
    sagaMiddleware,
  ];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware.apply(null, middlewares),
      persistState('budget', { key: 'aracari' })
    )
  );

  sagaMiddleware.run(submitNewBudgetItem);
  sagaMiddleware.run(submitNewCategory);
  sagaMiddleware.run(submitUpdatedCategory);

  return store;
}
