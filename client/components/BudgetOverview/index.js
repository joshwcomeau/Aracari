import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { openDrawer } from 'ducks/drawer.duck';
import CategoryProgress from 'components/CategoryProgress';
import BudgetDate from 'components/BudgetDate';
import FlatButton from 'material-ui/FlatButton';

import { getProgressThroughMonth } from 'utils/time.utils';
import { ADD_CATEGORY_DRAWER } from 'constants';
import 'scss/budget-overview.scss';


const Budget = ({ categorySlugs, actions }) => {
  const monthProgress = getProgressThroughMonth();
  const dateString = moment().format('MMMM Do');

  const categoriesJsx = categorySlugs.map(slug => (
    <CategoryProgress
      category={slug}
      key={slug}
      monthProgress={monthProgress}
    />
  ));

  // TODO If we have no categories, show a special "Add your first category" bit.
  // Otherwise, show a smaller "Add Category" button.

  return (
    <div id="budget-overview">
      <BudgetDate monthProgress={monthProgress} dateString={dateString} />
      <div className="category-progress-wrapper">
        {categoriesJsx}
      </div>
      <div className="add-category-button">
        <FlatButton
          secondary
          onTouchTap={() => actions.openDrawer(ADD_CATEGORY_DRAWER)}
          icon={<i className="material-icons">playlist_add</i>}
        />
      </div>
    </div>
  );
};

Budget.propTypes = {
  categorySlugs: PropTypes.array.isRequired,
  actions: PropTypes.object,
};

const mapStateToProps = state => ({
  categorySlugs: state.budget.categories.map(category => category.slug),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ openDrawer }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
