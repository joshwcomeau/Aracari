import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

import 'scss/button-toggle-group.scss';


class ButtonToggleGroup extends Component {
  renderButtons() {
    return this.props.buttons.map(button => (
      <div className="button-wrapper" key={button.label}>
        <FlatButton
          rippleColor="rgb(255, 255, 255)"
          hoverColor="rgb(255, 255, 255)"
          disabled={button.disabled}
          className={this.props.selected === button.value ? 'selected' : null}
          onClick={() => this.props.onClick(button.value)}
        >
          <i className="material-icons">{button.icon}</i>
          {button.label}
        </FlatButton>
      </div>
    ));
  }

  render() {
    return (
      <div className="button-toggle-group">
        {this.renderButtons()}
      </div>
    );
  }
}

ButtonToggleGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      icon: PropTypes.string,
    })
  ),
  selected: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonToggleGroup;
