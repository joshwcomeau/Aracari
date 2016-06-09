import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleNewItemDrawer } from 'ducks/budget.duck';
import Drawer from 'components/Drawer';
import 'scss/add-budget-item.scss';


const AddBudgetItem = ({ isOpen, actions }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onBackdropClick={() => actions.toggleNewItemDrawer(false)}
    >
      <h2>Record a Cost</h2>
    </Drawer>
  );
};

AddBudgetItem.propTypes = {
  actions: PropTypes.object,
  isOpen: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.budget.get('addingNewItem'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleNewItemDrawer }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBudgetItem);
