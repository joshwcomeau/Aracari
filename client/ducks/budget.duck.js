import { fromJS } from 'immutable';
import slug from 'slug';

import { reset } from 'redux-form';

const initialState = fromJS({
  categories: [
    {
      name: 'Food',
      slug: 'food',
      limit: 50000,
      items: [
        { details: 'Hamburger', value: 1000 },
        { details: 'Indian Food', value: 4500 },
        { details: 'Groceries', value: 9000 },
      ],
    }, {
      name: 'Entertainment',
      slug: 'entertainment',
      limit: 20000,
      items: [
        { details: 'Movies', value: 3000 },
        { details: 'Video Game', value: 14000 },
      ],
    }, {
      name: 'Medication',
      slug: 'medication',
      limit: 15000,
      items: [
        { details: 'Pills', value: 1000 },
      ],
    },
  ],
});


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const SUBMIT_NEW_BUDGET_ITEM = 'BUDGET/SUBMIT_NEW_BUDGET_ITEM';
export const ADD_BUDGET_ITEM = 'BUDGET/ADD_BUDGET_ITEM';
export const SUBMIT_NEW_CATEGORY = 'BUDGET/SUBMIT_NEW_CATEGORY';
export const ADD_CATEGORY = 'BUDGET/ADD_CATEGORY';
export const TOGGLE_NEW_ITEM_DRAWER = 'BUDGET/TOGGLE_NEW_ITEM_DRAWER';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
function budgetCategoryReducer(state, action) {
  const { type, category, ...data } = action;

  switch (type) {
    case ADD_BUDGET_ITEM: {
      if (state.get('slug') !== category) {
        return state;
      }

      // Ensure values are always numbers
      data.value = Number(data.value);

      return state.update('items', items => items.push(fromJS({ ...data })));
    }

    default:
      return state;
  }
}

export default function budgetReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY: {
      return state.update('categories', categories => (
        categories.push(fromJS({
          name: action.name,
          slug: slug(action.name).toLowerCase(),
          limit: action.limit,
          items: [],
        }))
      ));
    }

    case ADD_BUDGET_ITEM: {
      return state.update('categories', categories => (
        categories.map(category => budgetCategoryReducer(category, action))
      ));
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const submitNewBudgetItem = data => ({
  // NOTE: This action does not directly affect the state. It is listened to
  // by the saga of the same name, which dispatches other actions.
  type: SUBMIT_NEW_BUDGET_ITEM,
  data,
});

export const addBudgetItem = data => ({
  type: ADD_BUDGET_ITEM,
  ...data,
});

export const addCategory = ({ name, limit }) => ({
  type: ADD_CATEGORY,
  name,
  limit,
});

export const submitNewCategory = data => ({
  // NOTE: This action does not directly affect the state. It is listened to
  // by the saga of the same name, which dispatches other actions.
  type: SUBMIT_NEW_CATEGORY,
  data,
});
