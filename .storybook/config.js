/* eslint-disable global-require */
import { configure } from '@kadira/storybook';

function loadStories() {
  require('../client/stories/category-progress.js');
}

configure(loadStories, module);
