/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import * as _ from 'lodash';

import reducer, {
  ADD_BUDGET_ITEM,
  ADD_CATEGORY,
  addBudgetItem,
  addCategory,
} from '../../client/ducks/budget.duck';

function generateCategory({
  label = 'Food',
  value = 'food',
  limit = 50000,
  items = [],
} = {}) {
  return fromJS({ label, value, limit, items });
}


describe('Budget reducer', () => {
  describe(ADD_CATEGORY, () => {
    it('Adds to the initial, empty state', () => {
      const initialState = fromJS({ categories: [] });

      const state = reducer(initialState);
      const action = addCategory({
        label: 'Food',
        limit: 50000,
      });

      const expectedState = fromJS({
        categories: [{
          label: 'Food',
          value: 'food',
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
        label: 'Entertainment',
        limit: 10000,
      });

      const expectedState = fromJS({
        categories: [{
          label: 'Food',
          value: 'food',
          limit: 50000,
          items: [],
        }, {
          label: 'Entertainment',
          value: 'entertainment',
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
          label: 'Entertainment',
          value: 'entertainment',
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
            label: 'Food',
            value: 'food',
            limit: 50000,
            items: [
              { details: 'groceries', value: 25000 },
            ],
          },
          {
            label: 'Entertainment',
            value: 'entertainment',
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
