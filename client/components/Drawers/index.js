import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { convertFromCents } from 'utils/money.utils';

import AddBudgetItem from 'components/AddBudgetItem';
import AddCategory from 'components/AddCategory';
import EditCategory from 'components/EditCategory';
import { EDIT_CATEGORY_DRAWER } from 'constants';


const Drawers = ({ data }) => (
  <div id="drawers">
    <AddBudgetItem />
    <AddCategory />
    <EditCategory
      overwriteOnInitialValuesChange
      initialValues={data}
    />
  </div>
);

Drawers.propTypes = {
  data: PropTypes.object,
};

const mapStateToProps = (state) => {
  // The data needed will depend on the currently-active drawer.
  const { name, data } = state.drawer;

  switch (name) {
    case EDIT_CATEGORY_DRAWER: {
      const category = state.budget.categories.find(cat => (
        cat.slug === data.slug
      ));

      return { data: {
        ...category,
        limit: convertFromCents(category.limit),
      } };
    }

    default:
      return {};
  }
};

export default connect(mapStateToProps)(Drawers);
