const initialState = {};


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const OPEN_DRAWER = 'DRAWER/OPEN_DRAWER';
export const CLOSE_DRAWER = 'DRAWER/CLOSE_DRAWER';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
export default function drawerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_DRAWER: {
      return {
        name: action.name,
        data: action.data,
      };
    }

    case CLOSE_DRAWER: {
      // NOTE: We only want to close the drawer if the user is trying to
      // close the currently-open drawer. This is to prevent weird glitches,
      // if a drawer opens while another one is closing.
      return action.name === state.name ? initialState : state;
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const openDrawer = (name, data) => ({
  type: OPEN_DRAWER,
  name,
  data,
});

export const closeDrawer = name => ({
  type: CLOSE_DRAWER,
  name,
});
