import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import Smooch from 'utils/smooch';
import configureStore from 'store';
import HomeContainer from 'containers/HomeContainer.jsx';

require('./scss/main.scss');

const store = configureStore();

render((
  <Provider store={store}>
    <HomeContainer />
  </Provider>
), document.getElementById('render-target'))
