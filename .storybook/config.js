/* eslint-disable global-require */
import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/stories/budget-category.story');
}

configure(loadStories, module);
