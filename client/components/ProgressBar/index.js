import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';

import FluidEventHandler from 'components/FluidEventHandler';
import 'scss/progress-bar.scss';


class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.setContainerWidth = this.setContainerWidth.bind(this);

    this.state = {
      containerWidth: 0,
    };
  }

  getBackgroundColour(width) {
    const { backgroundColor } = this.props;

    // `backgroundColor` can either be a string or a function.
    // If it's a function, invoke it w/ the width to retrieve the colour.
    return typeof backgroundColor === 'string'
      ? backgroundColor
      : backgroundColor(width);
  }

  getNormalizedWidth(percentage) {
    // We're passed a percentage for the budget progress, but because we're
    // using hardware-accelerated CSS properties, we need to translate that
    // into pixels. If the container is 200px wide and we're 10% through the
    // budget, we need to return `20`.
    return percentage * (this.state.containerWidth / 100);
  }

  setContainerWidth() {
    this.setState({
      containerWidth: this.containerElem.getBoundingClientRect().width,
    });
  }

  render() {
    const { percentage, springSettings } = this.props;

    return (
      <FluidEventHandler
        event="resize"
        handler={this.setContainerWidth}
        lifecycleMethods={['componentDidMount']}
      >
        <div
          className="progress-bar-container"
          ref={el => this.containerElem = el}
        >
          <Motion
            defaultStyle={{ width: 0 }}
            style={{ width: spring(percentage, springSettings) }}
          >
            {({ width }) => (
              <div
                className="progress-bar"
                style={{
                  transform: `scaleX(${this.getNormalizedWidth(width)})`,
                  backgroundColor: this.getBackgroundColour(width),
                }}
              />
            )}
          </Motion>
        </div>
      </FluidEventHandler>
    );
  }
}

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  backgroundColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  springSettings: PropTypes.shape({
    stiffness: PropTypes.number,
    damping: PropTypes.number,
  }),
};

ProgressBar.defaultProps = {
  springSettings: {
    stiffness: 125,
    damping: 50,
  },
};

export default ProgressBar;
