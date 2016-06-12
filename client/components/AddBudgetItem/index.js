import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleNewItemDrawer } from 'ducks/budget.duck';
import Drawer from 'components/Drawer';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
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

      <div className="flex-row with-gutter">
        <div className="flex-cell two-thirds">
          <SelectField
            floatingLabelText="Category"
            style={{
              width: '100%',
              fontFamily: 'inherit',
            }}
          >
            <MenuItem value="food" primaryText="Food" />
            <MenuItem value="entertainment" primaryText="Entertainment" />
            <MenuItem value="medication" primaryText="Medication" />
          </SelectField>
        </div>
        <div className="flex-cell one-third">
          <TextField
            floatingLabelText="Cost"
            style={{
              width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>
      <div className="flex-row with-gutter">
        <div className="flex-cell full pulled-up">
          <TextField
            floatingLabelText="Details"
            style={{
              width: '100%',
              fontFamily: 'inherit',
            }} />
        </div>
      </div>

      <div className="button-wrapper">
        <RaisedButton
          className="submit-button"
          label="Save"
          secondary
          icon={<i className="material-icons">done</i>}
        />
      </div>
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
