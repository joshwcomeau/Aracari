import React, { PropTypes } from 'react';

import 'scss/budget-date.scss';


const BudgetDate = ({ monthProgress, dateString }) => {
  // If the date is in the first 65% of the month, we want the marker to be to
  // the left of the date. Otherwise, we want it on the left.
  const markerPosition = monthProgress <= 0.65 ? 'left' : 'right';

  const adjustedMonthProgress = markerPosition === 'right'
    ? 1 - monthProgress
    : monthProgress;

  const flagStyle = {
    [markerPosition]: `${adjustedMonthProgress * 100}%`,
  };

  const markerStyle = {
    [markerPosition]: markerPosition === 'right' ? '-1px' : 0,
  };

  return (
    <div className="budget-date">
      <div className="budget-date-flag" style={flagStyle}>
        <div className="budget-date-marker" style={markerStyle} />
        {dateString}
      </div>
    </div>
  );
};

BudgetDate.propTypes = {
  monthProgress: PropTypes.number.isRequired,
  dateString: PropTypes.string.isRequired,
};

export default BudgetDate;
