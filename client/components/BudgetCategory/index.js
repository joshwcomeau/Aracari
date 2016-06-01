import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBudgetColour, formatHSLColourForCSS } from 'utils/colour.utils';
import 'scss/budget-category.scss';


class BudgetCategory extends Component {
  componentDidUpdate() {
    // If the label of the category happens to overlap with the month progress
    // indicator, we want to shorten the lines. This cannot be done in a
    // declarative way, as far as I know, so I figure it out with the refs.
    const progressBox = this.monthProgress.getBoundingClientRect();
    const nameBox = this.name.getBoundingClientRect();

    if (progressBox.left > nameBox.left && progressBox.right < nameBox.right) {
      this.monthProgress.classList.add('contracted');
    } else {
      this.monthProgress.classList.remove('contracted');
    }
  }

  render() {
    const {
      // eslint-disable-next-line no-unused-vars
      name, slug, budget, amountSpent, monthProgress, actions,
    } = this.props;

    const budgetRatio = amountSpent / budget;
    const budgetPercentage = `${budgetRatio * 100}%`;
    const budgetColour = getBudgetColour(budgetRatio, monthProgress);
    const budgetProgressStyle = {
      width: budgetPercentage,
      backgroundColor: formatHSLColourForCSS(budgetColour),
    };

    const monthProgressStyle = { left: `${monthProgress * 100}%` };

    return (
      <div className="budget-category" onClick={actions.showAddCost}>
        <div className="budget-name" ref={el => this.name = el}>
          {name}
        </div>
        <div className="budget-progress" style={budgetProgressStyle} />
        <div
          className="month-progress"
          style={monthProgressStyle}
          ref={el => this.monthProgress = el}
        />
      </div>
    );
  }
}

BudgetCategory.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  budget: PropTypes.number.isRequired,
  amountSpent: PropTypes.number.isRequired,
  monthProgress: PropTypes.number.isRequired,
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch),
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...dispatchProps,
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { BudgetCategory };

export default connect(null, mapDispatchToProps, mergeProps)(BudgetCategory);
