import React, { Component } from 'react';
import { storiesOf } from '@kadira/storybook';

import { CategoryProgress } from 'components/CategoryProgress';
import './story-helpers';

function generateProps({
  name = 'Food',
  slug = 'food',
  budgetRatio = 0.2,
  monthProgress = 0.5,
  actions = {},
} = {}) {
  return {
    name, slug, budgetRatio, monthProgress, actions,
  };
}

storiesOf('CategoryProgress', module)
  .add('default', () => (
    <CategoryProgressController {...generateProps()} />
  ))
  .add('with added cost', () => (
    <CategoryProgressController
      {...generateProps({ budgetRatio: 0.6 })}
    />
  ));

class CategoryProgressController extends Component {
  constructor(props, ...args) {
    super(props, ...args);

    this.state = props;
    this.budgetRatioValues = [0.2, 0.35, 0.52, 0.78, 0, 0.1];
  }

  updateAmountSpent() {
    // Rotate the array
    this.budgetRatioValues.push(this.budgetRatioValues.shift());

    this.setState({
      budgetRatio: this.budgetRatioValues[0],
    });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.updateAmountSpent()}>
          Update Amount Spent
        </button>
        <CategoryProgress {...this.state} />
      </div>
    );
  }
}
