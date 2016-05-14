/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';
import * as _ from 'lodash';

import reducer,
  { ADD_COST, ADD_CATEGORY }
from '../../client/ducks/budget.duck';

describe('Budget reducer', () => {
  it(ADD_CATEGORY, () => {
    const initialState = fromJS({ categories: [] });
    const state = reducer(initialState);

    const action = {
      type: ADD_CATEGORY,
      name: 'Food',
      budget: 50000,
    };

    const expectedState = fromJS({
      categories: [{
        name: action.name,
        budget: 50000,
        amountSpent: 0,
      }],
    });
    const actualState = reducer(state, action);

    expect(actualState).to.equal(expectedState);
  });
});
