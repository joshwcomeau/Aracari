import { slug, capitalizeWords } from 'utils/misc.utils';

const initialState = {
  categories: [
    {
      label: 'Food',
      slug: 'food',
      icon: 'local_pizza',
      colour: '#558B2F',
      limit: 50000,
      items: [
        { id: 'a', details: 'Hamburger', value: 1000, createdAt: '2016-06-03' },
        { id: 'b', details: 'Indian Food', value: 4500, createdAt: '2016-06-06' },
        { id: 'c', details: 'Groceries', value: 9000, createdAt: '2016-06-07' },
        { id: 'd', details: 'Burger', value: 100, createdAt: '2016-06-07' },
        { id: 'e', details: 'Groceries', value: 2500, createdAt: '2016-06-10' },
      ],
    }, {
      label: 'Entertainment',
      slug: 'entertainment',
      icon: 'local_play',
      colour: '#512DA8',
      limit: 20000,
      items: [
        { id: 'f', details: 'Movies', value: 3000, createdAt: '2016-03-04' },
        { id: 'g', details: 'Video Game', value: 14000, createdAt: '2016-04-04' },
      ],
    }, {
      label: 'Miscellaneous',
      slug: 'miscellaneous',
      icon: 'build',
      colour: '#37474F',
      limit: 15000,
      items: [
        { details: 'Bike', value: 1000 },
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
export const UPDATE_CATEGORY = 'BUDGET/UPDATE_CATEGORY';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
function budgetCategoryReducer(state, action) {
  const { type, category, ...data } = action;

  switch (type) {
    case ADD_BUDGET_ITEM: {
      if (state.slug !== category) {
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
            slug: slug(action.label).toLowerCase(),
            limit: action.limit,
            items: [],
          },
        ],
      };
    }

    case UPDATE_CATEGORY: {
      return state;
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

export const updateCategory = data => ({
  type: UPDATE_CATEGORY,
  ...data,
});
