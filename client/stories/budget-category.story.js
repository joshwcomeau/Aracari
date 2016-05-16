import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { BudgetCategory } from 'components/BudgetCategory';
import './story-helpers';

function generateProps({
  name = 'Food',
  slug = 'food',
  budget = 50000,
  amountSpent = 20000,
  monthProgress = 1,
  actions = {},
} = {}) {
  return {
    name, slug, budget, amountSpent, monthProgress, actions,
  };
}

storiesOf('BudgetCategory', module)
  .add('default', () => (
    <BudgetCategoryController {...generateProps()} />
  ))
  .add('with added cost', () => (
    <BudgetCategoryController
      {...generateProps({ amountSpent: 25000 })}
    />
  ));

class BudgetCategoryController extends Component {
  constructor(props, ...args) {
    super(props, ...args);

    this.state = props;
    this.amountSpentValues = [20000, 35000, 49000, 52500, 0, 12345];
  }

  updateAmountSpent() {
    // Rotate the array
    this.amountSpentValues.push(this.amountSpentValues.shift());

    this.setState({
      amountSpent: this.amountSpentValues[0],
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.updateAmountSpent()}>
          Update Amount Spent
        </button>
        <BudgetCategory {...this.state} />
      </div>
    );
  }
}
