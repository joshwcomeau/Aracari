/* eslint-disable no-unused-vars, no-undef */
import { expect } from 'chai';
import * as _ from 'lodash';

import {
  getBudgetColour, getPositionInRange, formatHSLColourForCSS,
  hueRange, satRange, litRange,
} from '../../client/utils/colour.utils';


describe('Colour Utils', () => {
  describe('getPositionInRange', () => {
    it('finds the earliest point in the range', () => {
      const range = [10, 20];

      const expectedValue = 10;
      const actualValue = getPositionInRange(range, 0);

      expect(actualValue).to.equal(expectedValue);
    });

    it('finds the quarter-point in the range', () => {
      const range = [10, 20];

      const expectedValue = 12.5;
      const actualValue = getPositionInRange(range, 0.25);

      expect(actualValue).to.equal(expectedValue);
    });

    it('finds a later point in the range', () => {
      const range = [10, 20];

      const expectedValue = 16;
      const actualValue = getPositionInRange(range, 0.6);

      expect(actualValue).to.equal(expectedValue);
    });

    it('finds the latest point in the range', () => {
      const range = [10, 20];

      const expectedValue = 20;
      const actualValue = getPositionInRange(range, 1);

      expect(actualValue).to.equal(expectedValue);
    });
  });

  describe('getBudgetColour', () => {
    it('starts off as the lowest colour', () => {
      const budgetProgress = 0;
      const monthProgress = 50;

      const expectedValue = [hueRange[0], satRange[0], litRange[0]];
      const actualValue = getBudgetColour(budgetProgress, monthProgress);

      expect(actualValue).to.deep.equal(expectedValue);
    });

    it('is the midpoint colour when right on track', () => {
      const budgetProgress = 50;
      const monthProgress = 50;

      const expectedValue = [
        getPositionInRange(hueRange, 0.5),
        getPositionInRange(satRange, 0.5),
        getPositionInRange(litRange, 0.5),
      ]
      const actualValue = getBudgetColour(budgetProgress, monthProgress);

      expect(actualValue).to.deep.equal(expectedValue);
    });

    it('is the highest colour when double the budget', () => {
      const budgetProgress = 100;
      const monthProgress = 50;

      const expectedValue = [hueRange[1], satRange[1], litRange[1]];
      const actualValue = getBudgetColour(budgetProgress, monthProgress);

      expect(actualValue).to.deep.equal(expectedValue);
    });

    it('clamps the colour after 2x budget', () => {
      const budgetProgress = 200;
      const monthProgress = 50;

      const expectedValue = [hueRange[1], satRange[1], litRange[1]];
      const actualValue = getBudgetColour(budgetProgress, monthProgress);

      expect(actualValue).to.deep.equal(expectedValue);
    });
  });

  describe('formatHSLColourForCSS', () => {
    it('converts an array of numbers into a valid CSS prop', () => {
      const colour = [100, 50, 25];

      const expectedValue = 'hsl(100, 50%, 25%)';
      const actualValue = formatHSLColourForCSS(colour);

      expect(actualValue).to.equal(expectedValue);
    });
  });
});
