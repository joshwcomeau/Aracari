import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { itemGraphDataSelector } from 'selectors/budget.selectors';


// eslint-disable-next-line no-unused-vars
const CategoryChart = ({ data }) => {
  return (
    <h1>Chart goes here</h1>
  );
};

CategoryChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  })),
};

function mapStateToProps(state, ownProps) {
  return {
    data: itemGraphDataSelector(ownProps.category),
  };
}

// Export the component _without_ the Redux bindings,
// for unit testing and storybook prototyping.
export { CategoryChart };

export default connect(mapStateToProps, null)(CategoryChart);
