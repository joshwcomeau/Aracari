import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import { submitUpdatedCategory } from 'ducks/budget.duck';
import { closeDrawer } from 'ducks/drawer.duck';
import { scrollIntoView } from 'utils/animation.utils';
import Drawer from 'components/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { EDIT_CATEGORY_FORM, EDIT_CATEGORY_DRAWER } from 'constants';
import 'scss/add-category.scss';


const EditCategory = ({ fields, isOpen, actions, handleSubmit }) => {
  const { limit } = fields;

  const onSubmit = handleSubmit(actions.submitUpdatedCategory);

  return (
    <Drawer
      isOpen={isOpen}
      title="Edit Category"
      onClose={() => actions.closeDrawer(EDIT_CATEGORY_DRAWER)}
      className="edit-category"
    >
      <form
        onSubmit={onSubmit}
      >
        <div className="flex-row with-gutter with-top-gutter">
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

EditCategory.propTypes = {
  fields: PropTypes.object.isRequired,
  actions: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    isOpen: state.drawer.name === EDIT_CATEGORY_DRAWER,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      submitUpdatedCategory,
      closeDrawer,
    }, dispatch),
  };
}

const formConfig = {
  form: EDIT_CATEGORY_FORM,
  fields: [
    'slug',
    'limit',
  ],
  touchOnBlur: false,
  validate({ limit }) {
    const errors = {};

    if (!limit) {
      errors.limit = 'Please enter your monthly budget.';
    }

    return errors;
  },
};

export default reduxForm(
  formConfig,
  mapStateToProps,
  mapDispatchToProps
)(EditCategory);
