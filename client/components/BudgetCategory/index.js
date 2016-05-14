import React, { PropTypes } from 'react';

import 'scss/budget-category.scss';


const BudgetCategory = ({ name, slug, budget, amountSpent }) => {
  console.log("Rendering budget", name, slug, budget, amountSpent)
  return (
    <div className="budget-category">
      {name}
    </div>
  );
};

// BudgetCategory.propTypes = {
//   name: PropTypes.string.isRequired,
//   slug: PropTypes.string.isRequired,
//   budget: PropTypes.number.isRequired,
//   amountSpent: PropTypes.number.isRequired,
// };

export default BudgetCategory;
