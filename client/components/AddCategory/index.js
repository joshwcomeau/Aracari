import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { addCategory } from 'ducks/budget.duck';
import { toggleDrawer } from 'ducks/drawer.duck';
import ButtonToggleGroup from 'components/ButtonToggleGroup';
import Drawer from 'components/Drawer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import 'scss/add-category.scss';
import categories from 'data/categories';


const AddCategory = ({ fields, isOpen, actions, handleSubmit, submitting }) => {
  const { name, limit } = fields;

  const onSubmit = handleSubmit(actions.addCategory);

  const showCustomNameField = name.value === null;

  const customNameField = (
    <div className="custom-name">
      <TextField
        floatingLabelText="Category Name"
        value={name.value}
        onChange={name.onChange}
        style={{
          width: '100%',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );

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
              buttons={categories}
              selected={name.value}
              onClick={name.onChange}
            />
            <ReactCSSTransitionGroup
              transitionName="custom-name"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={700}
            >
              {showCustomNameField ? customNameField : null}
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
      addCategory,
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
