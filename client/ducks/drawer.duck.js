const initialState = {};


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const TOGGLE_DRAWER = 'DRAWER/TOGGLE_DRAWER';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
export default function drawerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_DRAWER: {
      return {
        name: action.name,
        data: action.data,
      };
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const toggleDrawer = (name, data) => ({
  type: TOGGLE_DRAWER,
  name,
  data,
});
