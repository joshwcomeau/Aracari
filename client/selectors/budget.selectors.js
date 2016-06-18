import { createSelector } from 'reselect';

const limitSelector = state => state.limit;
const itemsSelector = state => state.items;

export const spentSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => (acc + item.value), 0)
);

export const availableSelector = createSelector(
  limitSelector,
  spentSelector,
  (limit, spent) => limit - spent
);

export const budgetProgressSelector = createSelector(
  limitSelector,
  spentSelector,
  (limit, spent) => (spent / limit) * 100
);
