import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import dynamics from 'dynamics.js';

import 'scss/drawer.scss';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      isOpen: typeof props.isOpen !== 'undefined' ? props.isOpen : false,
      isTransitioning: false,
    };
  }

  componentDidMount() {
    const currentHeight = this.getDrawerHeight();
    this.contentElem.style.transform = `translateY(${currentHeight}px)`;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.state.isOpen) {
      this.open();
    }

    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen,
      });
    }
  }

  getDrawerHeight() {
    return this.contentElem && this.contentElem.offsetHeight;
  }

  open() {
    this.setState({
      isTransitioning: true,
      isOpen: true,
    });

    dynamics.animate(this.contentElem, {
      translateY: 0,
    }, {
      type: dynamics.spring,
      duration: 2000,
      frequency: 336,
      friction: 490,
      complete: () => this.setState({ isTransitioning: false }),
    });
  }

  close() {
    // if (this.state.isTransitioning) { return; }

    // We want to 'blur' the active element so that the iOS keyboard closes.
    document.activeElement.blur();

    this.setState({
      isTransitioning: true,
      isOpen: false,
    });

    const currentHeight = this.getDrawerHeight();

    dynamics.animate(this.contentElem, {
      translateY: currentHeight,
    }, {
      type: dynamics.spring,
      duration: 500,
      frequency: 11,
      friction: 35,
      complete: () => {
        this.setState({ isTransitioning: false });
        this.props.onClose();
      },
    });
  }

  renderContent() {
    const { title, children } = this.props;

    return (
      <div
        className="content"
        ref={el => { this.contentElem = el; }}
      >
        <header className="header">
          <h2>{title}</h2>
          <button onTouchTap={this.close}>
            <i className="material-icons">close</i>
          </button>
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

    return (
      <div
        className={classes}
        ref={el => { this.backdropElem = el; }}
        onTouchTap={this.close}
      />
    );
  }

  render() {
    const classes = classNames(['drawer', this.props.className]);

    return (
      <div className={classes}>
        {this.renderBackdrop()}
        {this.renderContent()}
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

export default Drawer;
