import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MaterialUiSnackbar from 'material-ui/Snackbar';

import { updateSnackbar } from 'ducks/snackbar.duck';


const Snackbar = ({ text, actions }) => (
  <MaterialUiSnackbar
    open={!!text}
    message={text || ''}
    autoHideDuration={3000}
    onRequestClose={() => actions.updateSnackbar()}
  />
);

Snackbar.propTypes = {
  text: PropTypes.string,
  actions: PropTypes.object,
};

const mapStateToProps = state => ({
  text: state.snackbar.text,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateSnackbar,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
