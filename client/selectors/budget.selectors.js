import moment from 'moment';
import { createSelector } from 'reselect';

const limitSelector = state => state.limit;
const proratedLimitSelector = state => state.proratedLimit;
const itemsSelector = state => state.items;
const createdAtSelector = state => state.createdAt;

export const isProratedSelector = createSelector(
  proratedLimitSelector,
  createdAtSelector,
  (proratedLimit, createdAt) => {
    const createdAtMonth = moment(createdAt).month();
    const wasCreatedThisMonth = createdAtMonth === moment().month();
    const hasProratedLimit = typeof proratedLimit !== 'undefined';

    return wasCreatedThisMonth && hasProratedLimit;
  }
);

export const usableLimitSelector = createSelector(
  limitSelector,
  proratedLimitSelector,
  isProratedSelector,
  (limit, proratedLimit, isProrated) => {
    return isProrated ? proratedLimit : limit;
  }
);

export const spentSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => (acc + item.value), 0)
);

export const availableSelector = createSelector(
  usableLimitSelector,
  spentSelector,
  (limit, spent) => limit - spent
);

export const budgetProgressSelector = createSelector(
  usableLimitSelector,
  spentSelector,
  (limit, spent) => (spent / limit) * 100
);

// The idea here is, for the line graph, we want to have a cumulative data
// set. For example:
// {                                  {
//   hamburger: 10,       -->             p1: 10
//   pizza: 15,                           p2: 25 (10 + 15)
//   poutine: 5                           p3: 30 (25 + 5)
// }                                  }
export const itemGraphDataSelector = createSelector(
  itemsSelector,
  items => items.reduce((acc, item) => {
    const previousItem = acc[acc.length - 1];
    const cumulativeTotal = (previousItem ? previousItem.y : 0) + item.value;

    return [...acc, {
      x: Number(moment(item.createdAt).format('D')),
      y: cumulativeTotal,
    }];
  }, [])
);
