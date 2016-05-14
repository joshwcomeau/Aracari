import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'scss/budget.scss';


const Budget = ({state, actions}) => {
  console.log("PROPS", state, actions);

  return (
    <div id="budget">Hi!</div>
  )
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
