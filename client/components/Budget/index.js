import React, { Component } from 'react';
import { connect } from 'react-redux';

class Budget extends Component {
  render() {
    return (
      <div id="budget">Hello!</div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Budget);
