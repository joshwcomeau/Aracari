import React, { Component } from 'react';
import Smooch from 'utils/smooch';

import 'scss/smooch-widget.scss';

class SmoochWidget extends Component {
  componentDidMount() {
    Smooch.on('ready', () => {
      Smooch.render(this.smoochTarget);
    });
  }

  render() {
    return (
      <div id="smooch-target" ref={el => this.smoochTarget = el} />
    );
  }
}

export default SmoochWidget;
