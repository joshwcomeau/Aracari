import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { submitNewBudgetItem } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import Drawer from 'components/Drawer';
import SelectFieldWrapper from 'components/SelectFieldWrapper';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import 'scss/add-budget-item.scss';


const AddBudgetItem = ({ fields, categories, isOpen, actions, handleSubmit }) => {
  const { category, value, details } = fields;

  const onSubmit = handleSubmit(actions.submitNewBudgetItem);

  const menuItems = categories.map(cat => (
    <MenuItem key={cat.value} value={cat.value} primaryText={cat.label} />
  ));

  return (
    <Drawer
      title="Record a New Cost"
      isOpen={isOpen}
      onClose={() => actions.toggleDrawer()}
      className="add-budget-item"
    >
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
              {menuItems}
            </SelectFieldWrapper>
          </div>
          <div className="flex-cell one-third">
            <TextField
              type="number"
              step="0.01"
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

        <footer className="footer">
          <RaisedButton
            className="submit-button"
            label="Save"
            type="submit"
            secondary
            icon={<i className="material-icons">done</i>}
          />
        </footer>
      </form>
    </Drawer>
  );
};

AddBudgetItem.propTypes = {
  fields: PropTypes.object,
  categories: PropTypes.array,
  actions: PropTypes.object,
  isOpen: PropTypes.bool,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer === 'add-budget-item',
    categories: state.budget.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      submitNewBudgetItem,
      toggleDrawer,
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
  touchOnBlur: false,
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
