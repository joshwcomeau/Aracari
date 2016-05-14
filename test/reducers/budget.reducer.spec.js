/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';
import * as _ from 'lodash';

import reducer,
  { ADD_COST, ADD_CATEGORY }
from '../../client/ducks/budget.duck';

describe('Budget reducer', () => {
  describe(ADD_CATEGORY, () => {
    it('Adds to the initial, empty state', () => {
      const state = reducer();
      const action = {
        type: ADD_CATEGORY,
        name: 'Food',
        budget: 50000,
      };

      const expectedState = fromJS({
        categories: [{
          name: 'Food',
          slug: 'food',
          budget: 50000,
          amountSpent: 0,
        }],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });

    it('Creates multiple categories', () => {
      const initialState = fromJS({
        categories: [
          {
            name: 'Food',
            slug: 'food',
            budget: 50000,
            amountSpent: 0,
          },
        ],
      });
      const state = reducer(initialState);

      const action = {
        type: ADD_CATEGORY,
        name: 'Entertainment',
        budget: 10000,
      };

      const expectedState = fromJS({
        categories: [{
          name: 'Food',
          slug: 'food',
          budget: 50000,
          amountSpent: 0,
        }, {
          name: 'Entertainment',
          slug: 'entertainment',
          budget: 10000,
          amountSpent: 0,
        }],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });
  });
});
