import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Header from 'components/Header';

export default function HomeBase(DevTools = null) {
  const Home = (props) => {
    const { children, routes } = props;

    let classes = classNames({
      'wrapped-for-devtools': process.env.NODE_ENV !== 'production',
    });

    console.log("Route", props)

    return (
      <div id="home" className={classes}>
        <Header />
        {children}

        {DevTools ? <DevTools /> : null}
      </div>
    );
  };

  Home.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  };

  return Home;
}
