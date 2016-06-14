import { take, put } from 'redux-saga/effects';

import {
  SUBMIT_NEW_BUDGET_ITEM,
  toggleNewItemDrawer,
  addBudgetItem,
} from 'ducks/budget.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { reset } from 'redux-form';

// a utility function for waiting.
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


export default function* submitNewBudgetItem() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_NEW_BUDGET_ITEM);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;

    // The form submits `value` in dollars.
    // We need it as an integer in cents.
    data.value = Math.round(data.value * 100);

    // Close the New Item drawer
    yield put(toggleNewItemDrawer(false));

    yield [
      // Reset the form, for the next new budget addition.
      put(reset('add-budget-item')),

      // Add the item to the store
      put(addBudgetItem(data)),

      // Show the snackbar notification
    ];

    // Wait for the drawer to close, and show the snackbar
    yield delay(650);
    yield put(updateSnackbar('Your budget item has been added!'));
  }
}
