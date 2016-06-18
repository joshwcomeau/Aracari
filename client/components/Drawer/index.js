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

    dynamics.animate(this.contentElem, {
      translateY: 0,
    }, {
      type: dynamics.spring,
      duration: 2000,
      frequency: 336,
      friction: 490,
      anticipationSize: 50,
    });

    dynamics.animate(this.backdropElem, {
      opacity: 1,
    }, {
      type: dynamics.easeOut,
      duration: 700,
      friction: 100,
    });

    callback();
  }

  componentWillLeave(callback) {
    const currentHeight = this.getDrawerHeight();

    dynamics.animate(this.contentElem, {
      translateY: currentHeight,
    }, {
      type: dynamics.spring,
      duration: 500,
      frequency: 11,
      friction: 35,
      complete: callback,
    });

    dynamics.animate(this.backdropElem, {
      opacity: 0,
    }, {
      type: dynamics.easeInOut,
      duration: 500,
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
          <header className="header">
            {title}
            <button onClick={onClose}>
              <i className="material-icons">close</i>
            </button>
          </header>
          {children}
          <div className="footer-spacer" />
          <div className="bleed" />
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
