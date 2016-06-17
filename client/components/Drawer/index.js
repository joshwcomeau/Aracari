import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'scss/drawer.scss';


// eslint-disable-next-line react/prop-types
const DrawerContents = ({ children, title, className, onClose }) => {
  const classes = classNames(['drawer', className]);

  return (
    <div className={classes}>
      <div
        className="backdrop"
        onClick={onClose}
      />
      <div className="content">
        <header className="drawer-header">
          {title}
          <button onClick={onClose}>
            <i className="material-icons">close</i>
          </button>
        </header>
        {children}
        <div className="drawer-footer-spacer" />
      </div>
    </div>
  );
};

const Drawer = ({ isOpen, ...props }) => (
  <ReactCSSTransitionGroup
    transitionName="drawer"
    transitionEnterTimeout={450}
    transitionLeaveTimeout={600}
  >
    {isOpen ? <DrawerContents {...props} /> : null}
  </ReactCSSTransitionGroup>
);


Drawer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  springSettings: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
};

Drawer.defaultProps = {};

export default Drawer;
