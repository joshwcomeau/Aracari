import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from 'store';
import Budget from 'components/Budget';
import Home from 'components/Home';

import 'scss/main.scss';


// Needed for onTouchTap
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

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
