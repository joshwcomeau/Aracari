import { take, put } from 'redux-saga/effects';

import { SUBMIT_UPDATED_CATEGORY, updateCategory } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { delay } from 'utils/misc.utils';
import {
  convertToCents, shouldBudgetBeProrated, getProratedBudget
} from 'utils/money.utils';
import { EDIT_CATEGORY_DRAWER } from 'constants';


export default function* submitUpdatedCategory() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_UPDATED_CATEGORY);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;

    data.limit = convertToCents(data.limit);

    if (shouldBudgetBeProrated()) {
      data.proratedLimit = getProratedBudget(data.limit);
    }

    yield put(closeDrawer(EDIT_CATEGORY_DRAWER));

    yield put(updateCategory(data));

    // Wait for the drawer to close, and show the snackbar
    yield delay(650);
    yield put(updateSnackbar('Your category has been updated!'));
  }
}
