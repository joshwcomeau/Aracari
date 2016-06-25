const initialState = {
  categories: [],
};

// ////////////////////////
// ACTION TYPES //////////
// //////////////////////
export const SUBMIT_NEW_BUDGET_ITEM = 'BUDGET/SUBMIT_NEW_BUDGET_ITEM';
export const ADD_BUDGET_ITEM = 'BUDGET/ADD_BUDGET_ITEM';
export const DELETE_BUDGET_ITEM = 'BUDGET/DELETE_BUDGET_ITEM';
export const SUBMIT_NEW_CATEGORY = 'BUDGET/SUBMIT_NEW_CATEGORY';
export const ADD_CATEGORY = 'BUDGET/ADD_CATEGORY';
export const SUBMIT_UPDATED_CATEGORY = 'budget/SUBMIT_UPDATED_CATEGORY';
export const UPDATE_CATEGORY = 'BUDGET/UPDATE_CATEGORY';


// ////////////////////////
// REDUCERS //////////////
// //////////////////////
function budgetCategoryReducer(state, action) {
  const { type, budgetItem } = action;

  switch (type) {
    case ADD_BUDGET_ITEM: {
      return {
        ...state,
        items: [...state.items, { ...budgetItem }],
      };
    }

    case DELETE_BUDGET_ITEM: {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };
    }

    default:
      return state;
  }
}

export default function budgetReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_BUDGET_ITEM:
    case DELETE_BUDGET_ITEM: {
      return {
        categories: state.categories.map(category => (
          action.category === category.slug
            ? budgetCategoryReducer(category, action)
            : category

        )),
      };
    }

    case ADD_CATEGORY: {
      const { category } = action;

      return {
        categories: [
          ...state.categories,
          category,
        ],
      };
    }

    case UPDATE_CATEGORY: {
      const { updatedCategory } = action;

      const categories = state.categories.map(category => {
        if (category.slug === action.slug) {
          return { ...category, ...updatedCategory };
        }
        return { ...category };
      });

      return {
        ...state,
        categories,
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

export const addBudgetItem = ({ category, budgetItem }) => ({
  type: ADD_BUDGET_ITEM,
  category,
  budgetItem,
});

export const deleteBudgetItem = ({ category, id }) => ({
  type: DELETE_BUDGET_ITEM,
  category,
  id,
});

export const submitNewCategory = data => ({
  // NOTE: This action does not directly affect the state. It is listened to
  // by the saga of the same name, which dispatches other actions.
  type: SUBMIT_NEW_CATEGORY,
  data,
});

export const addCategory = category => ({
  type: ADD_CATEGORY,
  category,
});

export const submitUpdatedCategory = data => ({
  // NOTE: This action does not directly affect the state. It is listened to
  // by the saga of the same name, which dispatches other actions.
  type: SUBMIT_UPDATED_CATEGORY,
  data,
});

export const updateCategory = data => ({
  type: UPDATE_CATEGORY,
  data,
});
