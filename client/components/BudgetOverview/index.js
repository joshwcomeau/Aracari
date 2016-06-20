import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { toggleDrawer } from 'ducks/drawer.duck';
import CategoryProgress from 'components/CategoryProgress';
import BudgetDate from 'components/BudgetDate';
import FlatButton from 'material-ui/FlatButton';

import { progressThroughMonth } from 'utils/time.utils';
import 'scss/budget-overview.scss';


const Budget = ({ categorySlugs, actions }) => {
  const monthProgress = progressThroughMonth();
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
          onTouchTap={() => actions.toggleDrawer('add-category')}
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
  actions: bindActionCreators({ toggleDrawer }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);