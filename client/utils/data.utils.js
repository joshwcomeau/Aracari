import { presetCategoryArray } from 'data/preset-categories';
import { convertToCents } from 'utils/currency.utils';

export const formatCategoryForState = ({ presetLabel, customLabel, limit }) => {
  // Takes raw form data and processes it for storage in the state.
  const scrubbedData = {
    label: presetLabel === 'custom' ? customLabel : presetLabel,
    limit: convertToCents(limit),
  };

  // Fetch the presentational data (icon, colour) from our data file.
  // Is this the best way to do this?
  const categoryData = presetCategoryArray[presetLabel] || presetCategoryArray.custom;

  return {
    ...categoryData,
    ...scrubbedData,
  };
};
