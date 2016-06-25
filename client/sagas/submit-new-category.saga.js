import { take, put } from 'redux-saga/effects';
import { reset } from 'redux-form';

import { SUBMIT_NEW_CATEGORY, addCategory } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { delay } from 'utils/misc.utils';
import { formatCategoryForState } from 'utils/data.utils';
import { shouldBudgetBeProrated, getProratedBudget } from 'utils/money.utils';
import { ADD_CATEGORY_DRAWER, ADD_CATEGORY_FORM } from 'constants';


export default function* submitNewCategory() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_NEW_CATEGORY);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;

    // We have some data cleansing to do:
    // - Figure out whether the label is a preset or a custom label
    // - turn the limit into a number in cents
    const category = formatCategoryForState(data);

    if (shouldBudgetBeProrated()) {
      category.proratedLimit = getProratedBudget(category.limit);
    }

    // Close the New Category drawer
    yield put(closeDrawer(ADD_CATEGORY_DRAWER));

    yield [
      // Reset the form, for the next new budget addition.
      put(reset(ADD_CATEGORY_FORM)),

      put(addCategory(category)),
    ];

    // Wait for the drawer to close, and show the snackbar
    yield delay(650);
    yield put(updateSnackbar('Your category has been added!'));
  }
}
