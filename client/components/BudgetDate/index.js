import React, { PropTypes } from 'react';
import moment from 'moment';

import 'scss/budget-date.scss';


const dateString = moment().format('MMMM Do');

const BudgetDate = ({ monthProgress }) => (
  <div className="budget-date">
    <div
      className="budget-date-marker"
      style={{
        left: `${monthProgress * 100}vw`,
      }}
    >
      {dateString}
    </div>
  </div>
);

BudgetDate.propTypes = {
  monthProgress: PropTypes.number.isRequired,
};

export default BudgetDate;
