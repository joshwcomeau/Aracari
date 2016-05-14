import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from 'reducers';


export default function configureStore() {
  const middlewares = [];
  middlewares.push(thunkMiddleware);

  return createStore(
    rootReducer,
    applyMiddleware.apply(null, middlewares)
  );
}
