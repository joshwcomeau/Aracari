import React, { PropTypes } from 'react';
import classNames from 'classnames';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from 'components/Header';
import Snackbar from 'components/Snackbar';

export default function HomeBase(DevTools = null) {
  const Home = (props) => {
    const { children, routes } = props;

    let classes = classNames({
      'wrapped-for-devtools': process.env.NODE_ENV !== 'production',
    });

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div id="home" className={classes}>
          <Header />
          {children}

          {DevTools ? <DevTools /> : null}

          <Snackbar />
        </div>
      </MuiThemeProvider>
    );
  };

  Home.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  return Home;
}
