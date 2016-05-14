import { Map, fromJS } from 'immutable';


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
      budget: 60000,
      amountSpent: 10000,
    },
  ],
});

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_CATEGORY: {
      const newCategory = Map({
        name: action.name,
        budget: action.budget,
        amountSpent: 0,
      });

      return state.update('categories', categories => (
        categories.push(newCategory)
      ));
    }

    case ADD_COST: {
      return state.set('selectedArtistId', action.artistId);
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
