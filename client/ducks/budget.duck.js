import { Map, fromJS } from 'immutable';
import slug from 'slug';


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const ADD_CATEGORY = 'LOAD_TRACKS';
export const ADD_COST = 'SELECT_ARTIST_FOR_TRACKS';


// ////////////////////////
// REDUCER ///////////////
// //////////////////////
const initialState = fromJS({
  categories: [
    {
      name: 'Food',
      slug: 'food',
      budget: 50000,
      amountSpent: 15000,
    }, {
      name: 'Entertainment',
      slug: 'entertainment',
      budget: 20000,
      amountSpent: 20000,
    }, {
      name: 'Medication',
      slug: 'medication',
      budget: 15000,
      amountSpent: 3500,
    },
  ],
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newCategory = Map({
        name: action.name,
        slug: slug(action.name).toLowerCase(),
        budget: action.budget,
        amountSpent: 0,
      });

      return state.update('categories', categories => (
        categories.push(newCategory)
      ));
    }

    case ADD_COST: {
      const categoryEntry = state.get('categories').findEntry(
        cat => cat.get('slug') === action.category
      );

      if (!categoryEntry) {
        throw new Error(
          'categoryNotFound',
          'It appears you tried to add a cost to a category that does not exist!');
      }

      const [categoryIndex, category] = categoryEntry;

      // TODO: Error handling (what if no category is found?)
      const newAmountSpent = category.get('amountSpent') + action.amount;

      return state.setIn(
        ['categories', categoryIndex, 'amountSpent'],
        newAmountSpent
      );
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
