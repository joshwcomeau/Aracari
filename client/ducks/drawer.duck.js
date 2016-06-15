const initialState = '';


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const TOGGLE_DRAWER = 'DRAWER/TOGGLE_DRAWER';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
export default function snackbarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return action.name || '';
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const toggleDrawer = (name) => ({
  type: TOGGLE_DRAWER,
  name,
});
