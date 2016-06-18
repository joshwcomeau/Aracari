import slug from 'slug';

import { capitalizeWords } from 'utils/misc.utils';

const initialState = {
  categories: [
    {
      label: 'Food',
      value: 'food',
      limit: 50000,
      items: [
        { details: 'Hamburger', value: 1000 },
        { details: 'Indian Food', value: 4500 },
        { details: 'Groceries', value: 9000 },
      ],
    }, {
      label: 'Entertainment',
      value: 'entertainment',
      limit: 20000,
      items: [
        { details: 'Movies', value: 3000 },
        { details: 'Video Game', value: 14000 },
      ],
    }, {
      label: 'Medication',
      value: 'medication',
      limit: 15000,
      items: [
        { details: 'Pills', value: 1000 },
      ],
    },
  ],
};


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
      if (state.value !== category) {
        return state;
      }

      // Ensure values are always numbers
      data.value = Number(data.value);


      return {
        ...state,
        items: [...state.items, { ...data }],
      };
    }

    default:
      return state;
  }
}

export default function budgetReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY: {
      return {
        categories: [
          ...state.categories,
          {
            label: capitalizeWords(action.label),
            value: slug(action.label).toLowerCase(),
            limit: action.limit,
            items: [],
          },
        ],
      };
    }

    case ADD_BUDGET_ITEM: {
      return {
        categories: state.categories.map(category =>
          budgetCategoryReducer(category, action)
        ),
      };
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
  // by the saga of the same label, which dispatches other actions.
  type: SUBMIT_NEW_BUDGET_ITEM,
  data,
});

export const addBudgetItem = data => ({
  type: ADD_BUDGET_ITEM,
  ...data,
});

export const submitNewCategory = data => ({
  // NOTE: This action does not directly affect the state. It is listened to
  // by the saga of the same name, which dispatches other actions.
  type: SUBMIT_NEW_CATEGORY,
  data,
});

export const addCategory = data => ({
  type: ADD_CATEGORY,
  ...data,
});
