import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getBudgetColour, formatHSLColourForCSS } from 'utils/colour.utils';
import 'scss/budget-category.scss';


const BudgetCategory = ({
  name, slug, budget, amountSpent, monthProgress, actions,
}) => {
  const budgetRatio = amountSpent / budget;
  const budgetPercentage = `${budgetRatio * 100}%`;
  const budgetColour = getBudgetColour(budgetRatio, monthProgress);
  const budgetProgressStyle = {
    width: budgetPercentage,
    backgroundColor: formatHSLColourForCSS(budgetColour),
  };

  const monthPercentage = `${monthProgress * 100}vw`;
  const monthProgressStyle = { transform: `translateX(${monthPercentage})` };

  return (
    <div className="budget-category" onClick={actions.showAddCost}>
      <div className="budget-progress" style={budgetProgressStyle} />
      <div className="month-progress" style={monthProgressStyle} />
      <div className="budget-name">{name}</div>
    </div>
  );
};

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
