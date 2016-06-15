import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { submitNewCategory } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import Drawer from 'components/Drawer';
import SelectFieldWrapper from 'components/SelectFieldWrapper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import 'scss/add-category.scss';


const AddCategory = ({ fields, isOpen, actions, handleSubmit, submitting }) => {
  const { name, limit } = fields;

  const onSubmit = handleSubmit(actions.submitNewCategory);

  return (
    <Drawer
      isOpen={isOpen}
      onBackdropClick={() => actions.toggleDrawer()}
      className="add-category"
    >
      <header className="drawer-header">
        Add a New Category
        <button onClick={() => actions.toggleDrawer()}>
          <i className="material-icons">close</i>
        </button>
      </header>

      <form
        onSubmit={onSubmit}
      >
        <div className="flex-row with-gutter">
          <div className="flex-cell">
            <TextField
              floatingLabelText="Name"
              {...name}
              errorText={name.touched ? name.error : null}
              style={{
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
          <div className="flex-cell">
            <TextField
              type="number"
              step="0.01"
              floatingLabelText="Monthly Budget"
              {...limit}
              errorText={limit.touched ? limit.error : null}
              style={{
                width: '100%',
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        <div className="drawer-footer">
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

AddCategory.propTypes = {
  fields: PropTypes.object,
  actions: PropTypes.object,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer === 'add-category',
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      submitNewCategory,
      toggleDrawer,
    }, dispatch),
  };
}

const formConfig = {
  form: 'add-category',
  fields: [
    'name',
    'limit',
  ],
  validate({ name, limit }) {
    const errors = {};

    if (!name) errors.name = 'Please enter a name.';
    if (!limit) errors.limit = 'Please enter the your monthly budget.';

    return errors;
  },
};

export default reduxForm(
  formConfig,
  mapStateToProps,
  mapDispatchToProps
)(AddCategory);
