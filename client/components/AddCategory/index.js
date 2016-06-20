import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { submitNewCategory } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import { scrollIntoView } from 'utils/animation.utils';
import ButtonToggleGroup from 'components/ButtonToggleGroup';
import Drawer from 'components/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'scss/add-category.scss';
import { categoryArray } from 'data/categories';


const AddCategory = ({
  fields, isOpen, currentCategorySlugs, actions, handleSubmit,
}) => {
  const { presetLabel, customLabel, limit } = fields;

  const onSubmit = handleSubmit(actions.submitNewCategory);

  const showCustomLabelField = presetLabel.value === 'custom';

  const customLabelField = (
    <div className="custom-label">
      <TextField
        hintText="Category Name"
        errorText={customLabel.touched ? customLabel.error : null}
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
  const categoriesWithDisabled = categoryArray.map(category => {
    if (currentCategorySlugs.indexOf(category.slug) !== -1) {
      // eslint-disable-next-line no-param-reassign
      category.disabled = true;
    }

    // eslint-disable-next-line no-param-reassign
    category.value = category.slug;

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
              onTouchTap={presetLabel.onChange}
            >
              {showCustomLabelField ? customLabelField : null}
            </ButtonToggleGroup>

            {
              presetLabel.touched && presetLabel.error
                ? <div className="error-text">{presetLabel.error}</div>
                : null
            }
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
              onFocus={scrollIntoView}
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
  currentCategorySlugs: PropTypes.arrayOf(PropTypes.string),
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer === 'add-category',
    currentCategorySlugs: state.budget.categories.map(cat => cat.slug),
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
  touchOnBlur: false,
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
