const initialState = {
  text: '',
};


// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const UPDATE_SNACKBAR = 'SNACKBAR/UPDATE_SNACKBAR';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
export default function snackbarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SNACKBAR: {
      return {
        text: action.text,
      };
    }

    default:
      return state;
  }
}


// ////////////////////////
// ACTION CREATORS ///////
// //////////////////////
export const updateSnackbar = (text) => ({
  type: UPDATE_SNACKBAR,
  text,
});
