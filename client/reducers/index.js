// eslint-disable-next-line no-unused-vars
import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import budget from 'ducks/budget.duck';


export default combineReducers({
  routing: routerReducer,
  budget,
});
