import clamp from 'lodash/clamp';
import compose from 'lodash/flowRight';

// Finds the position between two numbers.
// eg. when given 10, 20, and 0.5, it returns 15.
// This is because 15 is mid-way between 10 and 20, and our position is 0.5.
export function getPositionInRange([lower, upper], position) {
  return (upper - lower) * position + lower;
}

export const hueRange = [120, 0];
export const satRange = [84, 86];
export const litRange = [68, 59];

// Returns the current colour for a given budget.
// A scale from green to red, depending on how good/bad it is.
// Returns a CSS colour string (HSL).
export function getBudgetColour(monthProgress, budgetProgress) {
  // Our budgetProgress is our budget relative to the current calendar month.
  // For example, if our budget for June is 100$ and we've spent $50,
  // our budgetProgress is 50.
  //
  // Our monthProgress is how far along in the month we are.
  // On the 15th of a 30 day month, our monthProgress is 50.
  //
  // By comparing these two numbers, we can tell whether we are currently on
  // track to meet our monthly budget goal.

  const positionInScale = clamp(budgetProgress / monthProgress * 0.5, 1);
  // ( we multiply monthProgress by 0.5 because when our budgetProgress is the
  // same as our monthProgress, we are right on track, so we should be right
  // in the middle of the scale).

  const hue = Math.abs(getPositionInRange(hueRange, positionInScale));
  const saturation = getPositionInRange(satRange, positionInScale);
  const lightness = getPositionInRange(litRange, positionInScale);

  return [hue, saturation, lightness];
}

export function formatHSLColourForCSS([hue, saturation, lightness]) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export const getHSLBudgetColour = compose(
  formatHSLColourForCSS, getBudgetColour
);
