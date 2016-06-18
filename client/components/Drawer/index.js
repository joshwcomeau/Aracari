import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactTransitionGroup from 'react-addons-transition-group';
import dynamics from 'dynamics.js';

import 'scss/drawer.scss';


// eslint-disable-next-line react/prop-types
class Drawer extends Component {
  // eslint-disable-next-line react/sort-comp
  componentWillEnter(callback) {
    const currentHeight = this.getDrawerHeight();
    this.contentElem.style.transform = `translateY(${currentHeight}px)`;
    this.backdropElem.style.opacity = 0;

    // I want the duration to be dependent on the size of the element.
    // Let's assume 3x the size for now?
    const drawerAnimateDuration = currentHeight * 3;

    dynamics.animate(this.contentElem, {
      translateY: 0,
    }, {
      type: dynamics.spring,
      duration: drawerAnimateDuration,
      frequency: 1,
      friction: 377,
      anticipationSize: 10,
      complete: callback,
    });

    dynamics.animate(this.backdropElem, {
      opacity: 1,
    }, {
      type: dynamics.easeOut,
      duration: drawerAnimateDuration * 0.75,
      friction: 100,
    });
  }

  componentWillLeave(callback) {
    const currentHeight = this.getDrawerHeight();

    const drawerAnimateDuration = currentHeight * 1.5;

    dynamics.animate(this.contentElem, {
      translateY: currentHeight,
    }, {
      type: dynamics.spring,
      duration: drawerAnimateDuration,
      frequency: 1,
      friction: 27,
      complete: callback,
    });

    dynamics.animate(this.backdropElem, {
      opacity: 0,
    }, {
      type: dynamics.easeInOut,
      duration: drawerAnimateDuration,
      friction: 500,
    });
  }

  getDrawerHeight() {
    return this.contentElem && this.contentElem.offsetHeight;
  }

  render() {
    const { title, children, className, onClose } = this.props;
    const classes = classNames(['drawer', className]);

    return (
      <div className={classes}>
        <div
          className="backdrop"
          ref={el => { this.backdropElem = el; }}
          onClick={this.props.onClose}
        />

        <div
          className="content"
          ref={el => { this.contentElem = el; }}
        >
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
  }
}


Drawer.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  springSettings: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
};

Drawer.defaultProps = {};

const DrawerWrapper = props => (
  <ReactTransitionGroup>
    {props.isOpen ? <Drawer {...props} /> : null}
  </ReactTransitionGroup>
);

DrawerWrapper.propTypes = {
  isOpen: PropTypes.bool,
};

export default DrawerWrapper;
