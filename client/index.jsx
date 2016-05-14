import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import immutable from 'immutable';
import installDevTools from 'immutable-devtools';

import configureStore from 'store';
import Header from 'components/Header';
import Budget from 'components/Budget';
import Home from 'components/Home';

import 'scss/main.scss';


installDevTools(immutable);
const store = configureStore();

render((
  <Provider store={store}>
    <Home>
      <Header />
      <Budget />
    </Home>
  </Provider>
), document.getElementById('render-target'));
