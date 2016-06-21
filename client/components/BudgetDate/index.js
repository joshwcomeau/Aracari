import React, { PropTypes } from 'react';
import classNames from 'classnames';

import 'scss/budget-date.scss';


const BudgetDate = ({ monthProgress, dateString }) => {
  // If the date is in the first 65% of the month, we want the marker to be to
  // the left of the date. Otherwise, we want it on the left.
  const markerPosition = monthProgress <= 65 ? 'left' : 'right';

  const adjustedMonthProgress = markerPosition === 'right'
    ? 100 - monthProgress
    : monthProgress;

  const flagStyles = {
    [markerPosition]: adjustedMonthProgress + '%',
  };

  const markerStyles = {
    [markerPosition]: markerPosition === 'right' ? '-1px' : 0,
  };
  const markerClasses = classNames('budget-date-marker', markerPosition);

  return (
    <div className="budget-date">
      <div className="budget-date-flag" style={flagStyles}>
        <div className={markerClasses} style={markerStyles} />
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
