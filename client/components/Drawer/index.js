import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactTransitionGroup from 'react-addons-transition-group';

import 'scss/drawer.scss';


// eslint-disable-next-line react/prop-types
class Drawer extends Component {
  componentWillEnter(callback) {
    // On enter, we need to figure out the drawer's height, translate it down
    // by that amount, and then animate it back up.
    const currentHeight = this.getDrawerHeight();
    this.contentElem.style.transform = `translateY(${currentHeight}px)`;

    // Move it up 10px at a time until it's in the right place
    this.slideDrawer({
      start: currentHeight,
      end: 0,
      direction: 'up',
      callback,
    });
  }

  componentWillLeave(callback) {
    const currentHeight = this.getDrawerHeight();

    this.slideDrawer({
      start: 0,
      end: currentHeight,
      direction: 'down',
      callback,
    });
  }

  slideDrawer({ start, end, direction = 'up', callback }) {
    window.requestAnimationFrame(() => {
      const finished = direction === 'up' ? start <= end : start >= end;

      if (finished) { return callback(); }

      const newOffset = direction === 'up' ? start - 10 : start + 10;
      this.contentElem.style.transform = `translateY(${newOffset}px)`;

      return this.slideDrawer({
        start: newOffset,
        end,
        direction,
        callback,
      });
    });
  }

  componentDidMount() {
    this.drawerHeight = this.getDrawerHeight();
  }
  componentDidUpdate() {
    this.drawerHeight = this.getDrawerHeight();
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
          onClick={this.props.onClose}
        />
        <div className="content" ref={el => { this.contentElem = el; }}>
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

export default DrawerWrapper;
