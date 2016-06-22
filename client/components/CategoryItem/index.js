import React, { PropTypes } from 'react';
import Swipe from 'react-swipe-to-reveal-options';

import 'scss/category-item.scss';


const CategoryItem = ({ item }) => {
  const swipeActions = {
    maxItemWidth: 80,
    rightOptions: [{
      label: 'Edit',
      class: 'edit',
    }, {
      label: 'Remove',
      class: 'remove',
    }]
  }
  return (
    <div className="category-item">
      <Swipe {...swipeActions}>
        <div className="item-details">{item.details}</div>
      </Swipe>
    </div>
  );
};

CategoryItem.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    details: PropTypes.string,
  }).isRequired,
};

export default CategoryItem;
