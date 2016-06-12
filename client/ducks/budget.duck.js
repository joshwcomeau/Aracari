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
  addingNewItem: false,
});


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const ADD_CATEGORY = 'BUDGET/ADD_CATEGORY';
export const ADD_BUDGET_ITEM = 'BUDGET/ADD_BUDGET_ITEM';
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

    case TOGGLE_NEW_ITEM_DRAWER: {
      const newValue = action.isOpen || !state.get('addingNewItem');

      return state.set('addingNewItem', newValue);
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const addBudgetItem = ({ category, details, value }) => (
  // We want to first close the drawer, and then (after a delay) add the budget
  // item. It's done this way so that the user can see the effect of their
  // newly-added budget item.
  dispatch => {
    dispatch({ type: TOGGLE_NEW_ITEM_DRAWER });

    window.setTimeout(() => {
      // The form submits `value` in dollars.
      // We need it as an integer in cents.
      const valueInCents = Math.round(value * 100);

      dispatch({
        type: ADD_BUDGET_ITEM,
        category,
        details,
        value: valueInCents,
      });

      // Also, reset the form so that it's re-initialized for the next addition
      dispatch(reset('add-budget-item'));
    }, 350);
  }
);

export const addCategory = ({ name, limit }) => ({
  type: ADD_CATEGORY,
  name,
  limit,
});

export const toggleNewItemDrawer = ({ isOpen }) => ({
  type: TOGGLE_NEW_ITEM_DRAWER,
  isOpen,
});
