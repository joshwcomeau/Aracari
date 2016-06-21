import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import LineChart from 'react-svg-line-chart';

import { itemGraphDataSelector } from 'selectors/budget.selectors';


const CategoryChart = ({ data }) => {
  console.log(LineChart)
  return (
    <LineChart
      data={data}
    />
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
