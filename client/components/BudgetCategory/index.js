import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import 'scss/budget-category.scss';


const BudgetCategory = ({ name, slug, budget, amountSpent, monthProgress }) => {
  const budgetRatio = amountSpent / budget;

  const budgetPercentage = `${budgetRatio * 100}%`;
  const monthPercentage = `${monthProgress * 100}vw`;

  const budgetProgressStyle = { width: budgetPercentage };
  const monthProgressStyle = { transform: `translateX(${monthPercentage})` };

  console.log(monthPercentage)

  return (
    <div className="budget-category">
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

export default connect(null, mapDispatchToProps, mergeProps)(BudgetCategory);
