import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { submitNewCategory } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { scrollIntoView } from 'utils/animation.utils';
import ButtonToggleGroup from 'components/ButtonToggleGroup';
import Drawer from 'components/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { ADD_CATEGORY_FORM, ADD_CATEGORY_DRAWER } from 'constants';
import { presetCategoryArray } from 'data/preset-categories';
import 'scss/add-category.scss';


const AddCategory = ({
  fields, isOpen, activeCategories, actions, handleSubmit,
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
  const categoriesWithDisabled = presetCategoryArray.map(category => {
    const wasPreviouslyAdded = !!activeCategories.find(activeCategory => (
      activeCategory.slug === category.slug
    ));

    // eslint-disable-next-line no-param-reassign
    category.disabled = wasPreviouslyAdded;

    // eslint-disable-next-line no-param-reassign
    category.value = category.slug;

    return category;
  });

  return (
    <Drawer
      isOpen={isOpen}
      title="Add a New Category"
      onClose={() => actions.closeDrawer(ADD_CATEGORY_DRAWER)}
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
  activeCategories: PropTypes.array,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer.name === ADD_CATEGORY_DRAWER,
    activeCategories: state.budget.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      submitNewCategory,
      closeDrawer,
    }, dispatch),
  };
}

const formConfig = {
  form: ADD_CATEGORY_FORM,
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
