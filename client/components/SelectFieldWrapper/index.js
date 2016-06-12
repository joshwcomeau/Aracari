// A thin wrapper around MaterialUI's SelectField so that it plays nicely
// with Redux Form.
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';


class SelectFieldWrapper extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(evt, index, value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange}>
        {this.props.children}
      </SelectField>
    );
  }
}

export default SelectFieldWrapper;
