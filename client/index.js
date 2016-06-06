import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import immutable from 'immutable';

import configureStore from 'store';
import Budget from 'components/Budget';
import AddBudgetItem from 'components/AddBudgetItem';
import Home from 'components/Home';

import 'scss/main.scss';

console.log("ENV", process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
  const installDevTools = require('immutable-devtools');

  installDevTools(immutable);
}

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);


render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}>
        <IndexRoute component={Budget} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('render-target'));
