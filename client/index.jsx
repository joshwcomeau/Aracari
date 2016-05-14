import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from 'store';
import Header from 'components/Header';
import Budget from 'components/Budget';
import Home from 'components/Home';
import SmoochWidget from 'components/SmoochWidget';

import 'scss/main.scss';


const store = configureStore();

render((
  <Provider store={store}>
    <Home>
      <Header />
      <Budget />
      <SmoochWidget />
    </Home>
  </Provider>
), document.getElementById('render-target'));
