import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';

import IconButton from 'material-ui/IconButton';

import 'scss/drawer.scss';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
  }

  close(ev) {
    // We want to 'blur' the active element so that the iOS keyboard closes.
    document.activeElement.blur();

    this.props.onClose(ev);
  }

  renderContent(offset) {
    const { title, children } = this.props;

    return (
      <div className="content" style={{ transform: `translateY(${offset}%)` }}>
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

  renderBackdrop(opacity) {
    const styles = {
      opacity,
      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
    };

    return <div className="backdrop" style={styles} onTouchTap={this.close} />;
  }

  renderAnimated({ offset, opacity }) {
    const classes = classNames(['drawer', this.props.className]);

    return (
      <div className={classes}>
        {this.renderContent(offset)}
        {this.renderBackdrop(opacity)}
      </div>
    );
  }

  render() {
    const { isOpen, springSettings } = this.props;
    const drawerOffset = isOpen ? 0 : 100;
    const backdropOpacity = isOpen ? 1 : 0;

    return (
      <Motion
        style={{
          offset: spring(drawerOffset, springSettings),
          opacity: spring(backdropOpacity, springSettings),
        }}
      >
        {this.renderAnimated.bind(this)}
      </Motion>
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
