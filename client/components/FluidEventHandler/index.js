import React, { PropTypes, Component } from 'react';
import includes from 'lodash/includes';

import { fluidEventWrapper } from 'utils/animation.utils';


class FluidEventHandler extends Component {
  constructor(props) {
    super(props);
    this.handler = fluidEventWrapper(this.props.handler);
  }

  componentDidMount() {
    if (includes(this.props.lifecycleMethods, 'componentDidMount')) {
      this.handler();
    }

    window.addEventListener(this.props.event, this.handler);
  }

  componentDidUpdate() {
    if (includes(this.props.lifecycleMethods, 'componentDidUpdate')) {
      this.handler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener(this.props.event, this.handler);
  }

  render() {
    // Use ES6 rest operator to extract props to delegate to the element
    // created (we don't want to pass props like `event` or `handler`).
    const {
      // eslint-disable-next-line no-unused-vars
      children, event, handler, lifecycleMethods, typeName, ...props,
    } = this.props;

    // Using createElement instead of JSX because we don't know the node type.
    return React.createElement(typeName, props, children);
  }
}

FluidEventHandler.propTypes = {
  children: PropTypes.node,
  event: PropTypes.oneOf(['resize', 'scroll']),
  handler: PropTypes.func,
  typeName: PropTypes.string,
  lifecycleMethods: PropTypes.arrayOf([
    PropTypes.oneOf([
      'componentDidMount',
      'componentDidUpdate',
    ]),
  ]),
};

FluidEventHandler.defaultProps = {
  typeName: 'div',
};

export default FluidEventHandler;
