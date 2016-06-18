import { take, put } from 'redux-saga/effects';

import { SUBMIT_NEW_CATEGORY, addCategory } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { reset } from 'redux-form';
import { delay } from 'utils/misc.utils';


export default function* submitNewCategory() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_NEW_CATEGORY);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;

    // Capitalize the first letter of every word,

    // Close the New Item drawer
    yield put(toggleDrawer());

    yield [
      // Reset the form, for the next new budget addition.
      put(reset('add-category')),

      // Add the item to the store
      put(addCategory(data)),
    ];

    // Wait for the drawer to close, and show the snackbar
    yield delay(650);
    yield put(updateSnackbar('Your category has been added!'));
  }
}
