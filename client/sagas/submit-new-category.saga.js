import { take, put } from 'redux-saga/effects';
import { reset } from 'redux-form';

import { SUBMIT_NEW_CATEGORY, addCategory } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { delay } from 'utils/misc.utils';
import categories from 'data/categories';
import { ADD_CATEGORY } from 'data/drawer-constants';



export default function* submitNewCategory() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_NEW_CATEGORY);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;

    // We have some data cleansing to do:
    // - Figure out whether the label is a preset or a custom label
    // - turn the limit into a number in cents
    const { presetLabel, customLabel, limit } = data;
    const scrubbedData = {
      label: presetLabel === 'custom' ? customLabel : presetLabel,
      limit: Math.round(limit * 100),
    };

    // Fetch the presentational data (icon, colour) from our data file.
    // Is this the best way to do this?
    const categoryData = categories[presetLabel] || categories.custom;
    const mergedData = {
      ...categoryData,
      ...scrubbedData,
    };

    // Close the New Category drawer
    yield put(closeDrawer(ADD_CATEGORY));

    yield [
      // Reset the form, for the next new budget addition.
      put(reset(ADD_CATEGORY)),

      // Add the item to the store
      put(addCategory(mergedData)),
    ];

    // Wait for the drawer to close, and show the snackbar
    yield delay(650);
    yield put(updateSnackbar('Your category has been added!'));
  }
}
