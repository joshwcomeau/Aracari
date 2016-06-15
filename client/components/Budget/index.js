import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { toggleDrawer } from 'ducks/drawer.duck';
import CategoryProgress from 'components/CategoryProgress';
import BudgetDate from 'components/BudgetDate';
import AddBudgetItem from 'components/AddBudgetItem';
import AddCategory from 'components/AddCategory';
import FlatButton from 'material-ui/FlatButton';

import { progressThroughMonth } from 'utils/time.utils';
import 'scss/budget.scss';


const Budget = ({ categorySlugs, actions }) => {
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

  // TODO If we have no categories, show a special "Add your first category" bit.
  // Otherwise, show a smaller "Add Category" button.
  const AddCategoryButton = (
    <div className="add-category-button">
      <FlatButton
        secondary
        onClick={() => actions.toggleDrawer('add-category')}
        icon={<i className="material-icons">playlist_add</i>}
      />
    </div>
  );


  return (
    <div id="budget">
      <BudgetDate monthProgress={monthProgress} dateString={dateString} />
      {categoriesJsx}
      {AddCategoryButton}

      <AddBudgetItem />
      <AddCategory />
    </div>
  );
};

Budget.propTypes = {
  categorySlugs: PropTypes.array.isRequired,
  actions: PropTypes.object,
};

const mapStateToProps = state => ({
  categorySlugs: state.budget.get('categories').map(category => (
    category.get('slug')
  )).toJS(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ toggleDrawer }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
