import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import BudgetCategory from 'components/BudgetCategory';
import BudgetDate from 'components/BudgetDate';
import { progressThroughMonth } from 'utils/time.utils';
import 'scss/budget.scss';


const Budget = ({ categories }) => {
  const monthProgress = progressThroughMonth();
  const dateString = moment().format('MMMM Do');

  const categoriesJsx = categories.map(
    category => <BudgetCategory
      id={category.slug}
      key={category.slug}
      monthProgress={monthProgress}
      {...category}
    />
  );

  return (
    <div id="budget">
      <BudgetDate monthProgress={monthProgress} dateString={dateString} />
      {categoriesJsx}
    </div>
  );
};

Budget.propTypes = {
  categories: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  // NOTE: This is generally a bad practice!!
  // When using Immutable.js, it's generally a good idea, for perf reasons,
  // to keep the data structure immutable all the way down through components.
  // I really like rest/spread operators, though, and this is a tiny toy app,
  // so I don't anticipate perf concerns with such small amounts of state.
  // Don't do this in real apps though!
  const budget = state.get('budget').toJS();
  return { ...budget };
}

export default connect(mapStateToProps)(Budget);
