/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';
import * as _ from 'lodash';

import reducer,
  { ADD_COST, ADD_CATEGORY }
from '../../client/ducks/budget.duck';


function generateSampleState({
  name = 'Food',
  slug = 'food',
  budget = 50000,
  amountSpent = 0,
} = {}) {
  return fromJS({
    categories: [
      { name, slug, budget, amountSpent },
    ],
  });
}

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
      const state = reducer(generateSampleState());
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

  describe(ADD_COST, () => {
    it('adds a cost to the appropriate category', () => {
      const state = reducer(generateSampleState({ amountSpent: 10000 }));
      const action = {
        type: ADD_COST,
        category: 'food',
        amount: 25000,
      };

      const expectedState = fromJS({
        categories: [
          {
            name: 'Food',
            slug: 'food',
            budget: 50000,
            amountSpent: 35000,
          },
        ],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });

    it('throws when an invalid category slug is provided', () => {
      const state = reducer(generateSampleState());
      const action = {
        type: ADD_COST,
        category: 'nonsense!',
        amount: 100000000,
      };

      const expectedState = fromJS({
        categories: [
          {
            name: 'Food',
            slug: 'food',
            budget: 50000,
            amountSpent: 35000,
          },
        ],
      });

      expect(() => reducer(state, action)).to.throw('categoryNotFound');
    });
  });
});
