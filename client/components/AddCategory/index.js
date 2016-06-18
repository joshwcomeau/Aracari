import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { submitNewCategory } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import ButtonToggleGroup from 'components/ButtonToggleGroup';
import Drawer from 'components/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'scss/add-category.scss';
import categories from 'data/categories';


const AddCategory = ({
  fields, isOpen, currentCategoryValues, actions, handleSubmit,
}) => {
  const { presetLabel, customLabel, limit } = fields;

  const onSubmit = handleSubmit(actions.submitNewCategory);

  const showCustomLabelField = presetLabel.value === 'custom';

  const customLabelField = (
    <div className="custom-label">
      <TextField
        floatingLabelText="Category Name"
        value={customLabel.value}
        onChange={customLabel.onChange}
        style={{
          width: '100%',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );

  // We want to disable any categories the user has already added.
  const categoriesWithDisabled = categories.map(category => {
    if (currentCategoryValues.indexOf(category.value) !== -1) {
      // eslint-disable-next-line no-param-reassign
      category.disabled = true;
    }
    return category;
  });

  return (
    <Drawer
      isOpen={isOpen}
      title="Add a New Category"
      onClose={() => actions.toggleDrawer()}
      className="add-category"
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="flex-row with-gutter with-top-gutter">
          <div className="flex-cell full">
            <ButtonToggleGroup
              buttons={categoriesWithDisabled}
              selected={presetLabel.value}
              onClick={presetLabel.onChange}
            />
            <ReactCSSTransitionGroup
              transitionName="custom-label"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={700}
            >
              {showCustomLabelField ? customLabelField : null}
            </ReactCSSTransitionGroup>
          </div>
        </div>

        <div className="flex-row with-gutter">
          <div className="flex-cell full">
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

        <div className="footer">
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
  currentCategoryValues: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer === 'add-category',
    currentCategoryValues: state.budget.categories.map(cat => cat.value),
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
    'presetLabel',
    'customLabel',
    'limit',
  ],
  validate({ presetLabel, customLabel, limit }) {
    const errors = {};

    if (!presetLabel) {
      errors.presetLabel = 'Please select a label.';
    }
    if (presetLabel === 'custom' && !customLabel) {
      errors.customLabel = 'Please choose a name for your custom label.';
    }
    if (!limit) {
      errors.limit = 'Please enter the your monthly budget.';
    }

    return errors;
  },
};

export default reduxForm(
  formConfig,
  mapStateToProps,
  mapDispatchToProps
)(AddCategory);
