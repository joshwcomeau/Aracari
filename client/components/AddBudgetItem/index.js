import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleNewItemDrawer } from 'ducks/budget.duck';
import Drawer from 'components/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import 'scss/add-budget-item.scss';


const AddBudgetItem = ({ isOpen, actions }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onBackdropClick={() => actions.toggleNewItemDrawer(false)}
      className="add-budget-item"
    >
      <header>
        Record a New Cost
        <button onClick={() => alert('hi!')}>
          <i className="material-icons">close</i>
        </button>
      </header>
      <SelectField value="food">
        <MenuItem value="food" primaryText="Food" />
        <MenuItem value="entertainment" primaryText="Entertainment" />
        <MenuItem value="medication" primaryText="Medication" />
      </SelectField>
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
