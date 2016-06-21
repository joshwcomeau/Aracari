import React, { PropTypes } from 'react';


const CategoryItem = ({ item }) => {
  return (
    <div>Category Item</div>
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
