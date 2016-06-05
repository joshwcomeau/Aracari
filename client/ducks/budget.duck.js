import { Map, fromJS } from 'immutable';
import slug from 'slug';

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
export const ADD_CATEGORY = 'BUDGET/ADD_CATEGORY';
export const ADD_BUDGET_ITEM = 'BUDGET/ADD_BUDGET_ITEM';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
function budgetCategoryReducer(state, action) {
  // eslint-disable-next-line no-unused-vars
  const { type, category, ...newItem } = action;

  switch (type) {
    case ADD_BUDGET_ITEM: {
      if (state.get('slug') !== action.category) {
        return state;
      }

      return state.update('items', items => items.push(fromJS({ ...newItem })));
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
export const addBudgetItem = ({ category, details, value }) => ({
  type: ADD_BUDGET_ITEM,
  category,
  details,
  value,
});

export const addCategory = ({ name, limit }) => ({
  type: ADD_CATEGORY,
  name,
  limit,
});
