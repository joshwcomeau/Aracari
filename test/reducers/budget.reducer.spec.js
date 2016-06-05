/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import { List, Map, fromJS } from 'immutable';
import * as _ from 'lodash';

import reducer, {
  ADD_BUDGET_ITEM,
  ADD_CATEGORY,
  addBudgetItem,
  addCategory,
} from '../../client/ducks/budget.duck';

function generateCategory({
  name = 'Food',
  slug = 'food',
  limit = 50000,
  items = [],
} = {}) {
  return fromJS({ name, slug, limit, items });
}


describe('Budget reducer', () => {
  describe(ADD_CATEGORY, () => {
    it('Adds to the initial, empty state', () => {
      const initialState = fromJS({ categories: [] });

      const state = reducer(initialState);
      const action = addCategory({
        name: 'Food',
        limit: 50000,
      });

      const expectedState = fromJS({
        categories: [{
          name: 'Food',
          slug: 'food',
          limit: 50000,
          items: [],
        }],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });

    it('Creates multiple categories', () => {
      const initialState = fromJS({ categories: [ generateCategory() ] });

      const state = reducer(initialState);
      const action = addCategory({
        name: 'Entertainment',
        limit: 10000,
      });

      const expectedState = fromJS({
        categories: [{
          name: 'Food',
          slug: 'food',
          limit: 50000,
          items: [],
        }, {
          name: 'Entertainment',
          slug: 'entertainment',
          limit: 10000,
          items: [],
        }],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });
  });

  describe(ADD_BUDGET_ITEM, () => {
    it('adds a cost to the appropriate category', () => {
      const initialState = fromJS({ categories: [
        generateCategory(),
        generateCategory({
          name: 'Entertainment',
          slug: 'entertainment',
        })
      ] });

      const state = reducer(initialState);
      const action = addBudgetItem({
        category: 'food',
        details: 'groceries',
        value: 25000,
      });

      const expectedState = fromJS({
        categories: [
          {
            name: 'Food',
            slug: 'food',
            limit: 50000,
            items: [
              { details: 'groceries', value: 25000 },
            ],
          },
          {
            name: 'Entertainment',
            slug: 'entertainment',
            limit: 50000,
            items: [],
          },
        ],
      });
      const actualState = reducer(state, action);

      expect(actualState).to.equal(expectedState);
    });
  });
});
