import moment from 'moment';
import { getProgressThroughMonth } from 'utils/time.utils';

export const convertFromCents = value => (value / 100).toFixed(2);
export const convertToCents = value => Math.round(value * 100);

export const formatCurrency = (value, symbol = '$') => {
  let formattedValue = convertFromCents(value);

  if (symbol) {
    formattedValue = symbol + formattedValue;
  }

  return formattedValue;
};

// The budget should be prorated whenever it's not the first day of the month.
export const shouldBudgetBeProrated = (datem = moment()) => (
  datem.date() !== 1
);

export const getProratedBudget = (budget, datem = moment()) => {
  const monthProgress = getProgressThroughMonth(datem);

  // If we're 30% through the month, start by turning it into a ratio (0.3),
  // and then subtracting it from 1 to get the multiplier (0.7).
  const budgetMultiplier = 1 - monthProgress / 100;

  return Math.round(budget * budgetMultiplier);
};
