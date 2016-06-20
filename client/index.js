import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from 'store';
import BudgetOverview from 'components/BudgetOverview';
import CategoryDetails from 'components/CategoryDetails';
import Home from 'components/Home';
import { disableLandscapeMode } from 'utils/misc.utils';

import 'scss/main.scss';


// Needed for onTouchTap
// Check this repo: https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Force portrait-mode on mobile.
// Only works if the app is installed or in full-screen.
disableLandscapeMode();

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);


render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Home}>
        <IndexRoute component={BudgetOverview} />
        <Route path="/category/:category" component={CategoryDetails} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('render-target'));
