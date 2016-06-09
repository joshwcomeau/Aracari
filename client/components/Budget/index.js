import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import CategoryProgress from 'components/CategoryProgress';
import BudgetDate from 'components/BudgetDate';
import AddBudgetItem from 'components/AddBudgetItem';
import { progressThroughMonth } from 'utils/time.utils';
import 'scss/budget.scss';


const Budget = ({ categorySlugs, addingNewItem }) => {
  const monthProgress = progressThroughMonth();
  const dateString = moment().format('MMMM Do');

  const categoriesJsx = categorySlugs.map(
    slug => (
      <CategoryProgress
        slug={slug}
        key={slug}
        monthProgress={monthProgress}
      />
    )
  );

  return (
    <div id="budget">
      <BudgetDate monthProgress={monthProgress} dateString={dateString} />
      {categoriesJsx}

      <AddBudgetItem />
    </div>
  );
};

Budget.propTypes = {
  categorySlugs: PropTypes.array.isRequired,
  addingNewItem: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    addingNewItem: state.budget.get('addingNewItem'),
    categorySlugs: state.budget.get('categories').map(category => (
      category.get('slug')
    )).toJS(),
  };
}

export default connect(mapStateToProps)(Budget);
