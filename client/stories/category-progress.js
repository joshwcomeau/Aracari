import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { CategoryProgress } from 'components/CategoryProgress';
import './story-helpers';

function generateProps({
  label = 'Food',
  value = 'food',
  budgetProgress = 20,
  monthProgress = 45,
  actions = {},
} = {}) {
  return {
    label, value, budgetProgress, monthProgress, actions,
  };
}

storiesOf('CategoryProgress', module)
  .add('default', () => (
    <CategoryProgressController {...generateProps()} />
  ))
  .add('with added cost', () => (
    <CategoryProgressController
      {...generateProps({ budgetProgress: 60 })}
    />
  ));

class CategoryProgressController extends Component {
  constructor(props, ...args) {
    super(props, ...args);

    this.state = props;
    this.budgetProgressValues = [20, 35, 52, 78, 0, 10];
  }

  updateAmountSpent() {
    // Rotate the array
    this.budgetProgressValues.push(this.budgetProgressValues.shift());

    this.setState({
      budgetProgress: this.budgetProgressValues[0],
    });
  }

  render() {
    return (
      <div>
        <button onTouchTap={() => this.updateAmountSpent()}>
          Update Amount Spent
        </button>
        <CategoryProgress {...this.state} />
      </div>
    );
  }
}
