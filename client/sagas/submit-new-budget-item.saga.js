import { take, put, select } from 'redux-saga/effects';
import { reset } from 'redux-form';

import { SUBMIT_NEW_BUDGET_ITEM, addBudgetItem } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { updateSnackbar } from 'ducks/snackbar.duck';
import { availableSelector } from 'selectors/budget.selectors';
import { formatCurrency } from 'utils/money.utils';
import { formatBudgetItemForState } from 'utils/data.utils';
import { delay } from 'utils/misc.utils';
import {
  ADD_BUDGET_ITEM_DRAWER,
  ADD_BUDGET_ITEM_FORM,
} from 'constants';


export default function* submitNewBudgetItem() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const action = yield take(SUBMIT_NEW_BUDGET_ITEM);

    // eslint-disable-next-line no-unused-vars
    const { type, data } = action;
    const { category, ...budgetItemData } = data;

    // Close the New Item drawer
    yield put(closeDrawer(ADD_BUDGET_ITEM_DRAWER));

    yield delay(500);

    yield [
      // Reset the form, for the next new budget addition.
      put(reset(ADD_BUDGET_ITEM_FORM)),

      // Add the item to the store
      put(addBudgetItem({
        category,
        budgetItem: formatBudgetItemForState(budgetItemData),
      })),
    ];

    // After a short pause, show the user what remains of their budget.
    // eslint-disable-next-line no-use-before-define
    yield showUserRemainingBalance(category);
  }
}

function* showUserRemainingBalance(category) {
  const categories = yield select(state => state.budget.categories);
  const relevantCategory = categories.find(cat =>
    cat.slug === category
  );

  const { label } = relevantCategory;
  const available = availableSelector(relevantCategory);
  const formattedAvailable = formatCurrency(Math.abs(available));

  let snackbarMessage;
  if (available >= 0) {
    snackbarMessage = `
      You have ${formattedAvailable} left to spend on ${label} this month.
    `;
  } else {
    snackbarMessage = `
      Uh oh! You're ${formattedAvailable} over-budget this month on ${label}.
    `;
  }
  yield delay(500);
  yield put(updateSnackbar(snackbarMessage));
}
