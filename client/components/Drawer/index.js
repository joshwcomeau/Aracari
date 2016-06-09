import React, { PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'scss/drawer.scss';

const DrawerContents = ({ y, children, isOpen, onBackdropClick }) => (
  <div className="drawer">
    <div
      className="backdrop"
      onClick={onBackdropClick}
    />
    <div className="content">
      {children}
    </div>
  </div>
);

const Drawer = ({ isOpen, ...props }) => {
  return (
    <ReactCSSTransitionGroup
      transitionName="drawer"
      transitionEnterTimeout={450}
      transitionLeaveTimeout={600}
    >
      { isOpen ? <DrawerContents {...props} /> : null }
    </ReactCSSTransitionGroup>
  );
};

Drawer.propTypes = {
  children: PropTypes.node,
  onBackdropClick: PropTypes.func,
  isOpen: PropTypes.bool,
  springSettings: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
};

Drawer.defaultProps = {};

export default Drawer;
