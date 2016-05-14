// eslint-disable-next-line no-unused-vars
import { Map, List, fromJS } from 'immutable';

import budgetReducer from 'ducks/budget.duck';


const rootReducer = (state = Map(), action) => {
  return Map({
    budget: budgetReducer(
      state.get('budget'),
      action
    ),
    // Each top-level key here has a child reducer that manages that part
    // of the state. These reducers are defined in their own files, and
    // they take their slice of the state, as well as the action invoked.
    // Eg:
    //   game: game(
    //     state.get('game'),
    //     action
    //   )
  });
};

export default rootReducer;
