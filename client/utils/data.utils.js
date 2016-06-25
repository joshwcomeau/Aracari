import { presetCategoriesArray } from 'data/preset-categories';

export const formatCategoryForState = ({ presetLabel, customLabel, limit }) => {
  // Takes raw form data and processes it for storage in the state.
  const scrubbedData = {
    label: presetLabel === 'custom' ? customLabel : presetLabel,
    limit: Math.round(limit * 100),
  };

  // Fetch the presentational data (icon, colour) from our data file.
  // Is this the best way to do this?
  const categoryData = presetCategoriesArray[presetLabel] || presetCategoriesArray.custom;

  return {
    ...categoryData,
    ...scrubbedData,
  };
};

export const formatCategoryFromState = ({ slug, label, limit }) => {
  // The opposite of `formatCategoryForState`. Takes state and formats it
  // so it can be used in the "Edit Category" drawer.

  const isCustomLabel = !presetCategoriesArray.find(cat => cat.slug === slug);

  const field = {
    presetLabel: isCustomLabel ? 'custom' : slug,
    customLabel: isCustomLabel ? label : undefined,
    limit: (limit / 100).toFixed(2),
  };

  return field;
};
