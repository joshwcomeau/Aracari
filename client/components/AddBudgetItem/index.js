import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { addBudgetItem, toggleNewItemDrawer } from 'ducks/budget.duck';
import Drawer from 'components/Drawer';
import SelectFieldWrapper from 'components/SelectFieldWrapper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import 'scss/add-budget-item.scss';


const AddBudgetItem = ({ fields, isOpen, actions, handleSubmit, submitting }) => {
  const { category, value, details } = fields;

  const onSubmit = handleSubmit(actions.addBudgetItem);

  return (
    <Drawer
      isOpen={isOpen}
      onBackdropClick={() => actions.toggleNewItemDrawer(false)}
      className="add-budget-item"
    >
      <header>
        Record a New Cost
        <button onClick={() => actions.toggleNewItemDrawer(false)}>
          <i className="material-icons">close</i>
        </button>
      </header>

      <form
        onSubmit={onSubmit}
      >
        <div className="flex-row with-gutter">
          <div className="flex-cell two-thirds">
            <SelectFieldWrapper
              floatingLabelText="Category"
              {...category}

              errorText={category.touched ? category.error : null}
              style={{
                width: '100%',
                fontFamily: 'inherit',
              }}
            >
              <MenuItem value="food" primaryText="Food" />
              <MenuItem value="entertainment" primaryText="Entertainment" />
              <MenuItem value="medication" primaryText="Medication" />
            </SelectFieldWrapper>
          </div>
          <div className="flex-cell one-third">
            <TextField
              type="number"
              floatingLabelText="Cost"
              {...value}
              errorText={value.touched ? value.error : null}
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
              {...details}
              errorText={details.touched ? details.error : null}
              style={{
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        <div className="button-wrapper">
          <RaisedButton
            className="submit-button"
            label="Save"
            type="submit"
            secondary
            icon={<i className="material-icons">done</i>}
          />
        </div>
      </form>
    </Drawer>
  );
};

AddBudgetItem.propTypes = {
  fields: PropTypes.object,
  actions: PropTypes.object,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.budget.get('addingNewItem'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      addBudgetItem,
      toggleNewItemDrawer,
    }, dispatch),
  };
}

const formConfig = {
  form: 'add-budget-item',
  fields: [
    'category',
    'value',
    'details',
  ],
  validate({ category, value }) {
    const errors = {};

    if (!category) errors.category = 'Please select a category.';
    if (!value) errors.value = 'Please enter the cost.';

    return errors;
  },
};

export default reduxForm(
  formConfig,
  mapStateToProps,
  mapDispatchToProps
)(AddBudgetItem);
