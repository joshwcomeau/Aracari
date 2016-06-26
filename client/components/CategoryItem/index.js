import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Swipe from 'react-swipe-to-reveal-options';

import { deleteBudgetItem } from 'ducks/budget.duck';
import { formatCurrency } from 'utils/money.utils';
import 'scss/category-item.scss';


const CategoryItem = ({ categorySlug, item, actions }) => {
  const swipeActions = {
    maxItemWidth: 80,
    transitionBackOnRightClick: false,
    rightOptions: [{
      label: 'Remove',
      class: 'remove',
    }],
    onRightClick() {
      actions.deleteBudgetItem({
        category: categorySlug,
        id: item.id,
      });
    },
  };

  const formattedCreatedAt = moment(item.createdAt).format('MMM Do, h:mm a');
  const formattedValue = formatCurrency(item.value);

  return (
    <div className="category-item">
      <Swipe {...swipeActions}>
        <div className="item">
          <div className="item-details">{item.details}</div>
          <div className="item-created-at">{formattedCreatedAt}</div>
          <div className="item-price">{formattedValue}</div>
        </div>
      </Swipe>
    </div>
  );
};

CategoryItem.propTypes = {
  categorySlug: PropTypes.string,
  item: PropTypes.shape({
    value: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    details: PropTypes.string,
  }).isRequired,
  actions: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ deleteBudgetItem }, dispatch),
});

export default connect(null, mapDispatchToProps)(CategoryItem);
