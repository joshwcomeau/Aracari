import React, { PropTypes } from 'react';
import classNames from 'classnames';

export default function HomeBase(DevTools = null) {
  const Home = ({ children }) => {
    let classes = classNames({
      'wrapped-for-devtools': process.env.NODE_ENV !== 'production',
    });

    return (
      <div id="layout" className={classes}>
        {children}

        {DevTools ? <DevTools /> : null}
      </div>
    );
  };

  Home.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.obj]),
  };

  return Home;
}
