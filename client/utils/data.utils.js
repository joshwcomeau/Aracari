import moment from 'moment';
import uuid from 'uuid';

import presetCategories from 'data/preset-categories';
import { slugify, deslugifyAndCapitalize } from 'utils/misc.utils';
import { convertToCents } from 'utils/money.utils';

export const formatCategoryForState = ({ presetLabel, customLabel, limit }) => {
  // eslint-disable-next-line no-param-reassign
  limit = convertToCents(limit);

  // Figure out which of the labels to use (custom or preset), and de-slugify.
  const label = deslugifyAndCapitalize(
    presetLabel === 'custom' ? customLabel : presetLabel
  );

  const slug = slugify(label);
  const items = [];
  const createdAt = moment().format();

  // Fetch the presentational data (icon, colour) from our data file.
  const { icon, colour } = presetCategories[presetLabel] || presetCategories.custom;

  return { label, slug, limit, items, icon, colour, createdAt };
};

export const formatBudgetItemForState = ({ value, details }) => ({
  value: Math.round(value * 100),
  details,
  createdAt: moment().format(),
  id: uuid.v4(),
});
