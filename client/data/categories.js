import map from 'lodash/map';


/* eslint-disable quote-props */
const categories = {
  'food': {
    label: 'Food',
    icon: 'local_pizza',
    colour: '#558B2F',
  },
  'entertainment': {
    label: 'Entertainment',
    icon: 'local_play',
    colour: '#512DA8',
  },
  'transportation': {
    label: 'Transportation',
    icon: 'directions_bus',
    colour: '#FF8F00',
  },
  'hobbies': {
    label: 'Hobbies',
    icon: 'golf_course',
    colour: '#1565C0',
  },
  'clothing': {
    label: 'Clothing',
    icon: 'local_offer',
    colour: '#C62828',
  },
  'personal-care': {
    label: 'Personal care',
    icon: 'local_hospital',
    colour: '#0097A7',
  },
  'custom': {
    label: 'Custom',
    icon: 'build',
    colour: '#37474F',
  },
};

export default categories;

export const categoryArray = map(categories, (category, slug) => ({
  ...category,
  slug,
}));
