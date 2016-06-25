import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';

import IconButton from 'material-ui/IconButton';

import 'scss/drawer.scss';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.onRest = this.onRest.bind(this);

    this.state = {
      isOpen: typeof props.isOpen !== 'undefined' ? props.isOpen : false,
      isTransitioning: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isOpen && nextProps.isOpen) {
      this.open();
    } else if (this.state.isOpen && !nextProps.isOpen) {
      this.close();
    }
  }

  onRest() {
    this.setState({ isTransitioning: false });

    // Once the drawer has finished closing, we need to unset the `isTransitioning`
    // key in our state, and also broadcast that the drawer is closed, by invoking
    // the supplied callback.
    if (!this.state.isOpen) {
      this.props.onClose();
    }
  }

  open() {
    this.setState({
      isOpen: true,
    });
  }

  close() {
    // We want to 'blur' the active element so that the iOS keyboard closes.
    document.activeElement.blur();

    // Because that blur can change the height of the drawer (by showing an
    // error message if the field selected is invalid), we need to wait for
    // that action to run before recalculating the height.
    window.setTimeout(() => {
      this.setState({
        isTransitioning: true,
        isOpen: false,
      });
    }, 1);
  }

  renderContent(y) {
    const { title, children } = this.props;

    return (
      <div className="content" style={{ transform: `translateY(${y}%)` }}>
        <header className="header">
          <h2>{title}</h2>
          <IconButton onTouchTap={this.close}>
            <i className="material-icons">close</i>
          </IconButton>
        </header>
        {children}
        <div className="footer-spacer" />
        <div className="bleed" />
      </div>
    );
  }

  renderBackdrop() {
    const classes = classNames('backdrop', {
      'is-open': this.state.isOpen,
      'is-closed': !this.state.isOpen,
      'is-transitioning': this.state.isTransitioning,
    });

    return <div className={classes} onTouchTap={this.close} />;
  }

  render() {
    const { className, springSettings } = this.props;

    const classes = classNames(['drawer', className]);
    const offset = this.state.isOpen ? 0 : 100;

    return (
      <div className={classes}>
        {this.renderBackdrop()}
        <Motion
          style={{ y: spring(offset, springSettings) }}
          onRest={this.onRest}
        >
          {({ y }) => this.renderContent(y)}
        </Motion>
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

Drawer.defaultProps = {
  springSettings: {
    stiffness: 120,
    damping: 14,
  },
};

export default Drawer;
