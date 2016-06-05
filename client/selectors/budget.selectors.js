import { createSelector } from 'reselect';

const limitSelector = state => state.get('limit');
const itemsSelector = state => state.get('items');

export const spentSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => (acc + item.get('value')), 0)
);

export const availableSelector = createSelector(
  limitSelector,
  spentSelector,
  (limit, spent) => limit - spent
);

export const budgetRatioSelector = createSelector(
  limitSelector,
  spentSelector,
  (limit, spent) => spent / limit
);
