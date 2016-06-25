import moment from 'moment';

import presetCategories from 'data/preset-categories';
import { convertToCents } from 'utils/money.utils';

export const formatCategoryForState = ({ presetLabel, customLabel, limit }) => {
  // Takes raw form data and processes it for storage in the state.
  const scrubbedData = {
    label: presetLabel === 'custom' ? customLabel : presetLabel,
    limit: convertToCents(limit),
  };

  // Fetch the presentational data (icon, colour) from our data file.
  // Is this the best way to do this?
  const categoryData = presetCategories[presetLabel] || presetCategories.custom;

  const createdAt = moment().format();

  return {
    ...categoryData,
    ...scrubbedData,
    createdAt,
  };
};
