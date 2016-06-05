import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

import { toggleNewItemDrawer } from 'ducks/budget.duck';
import '../../scss/add-budget-item.scss';


const AddBudgetItem = ({ isOpen, actions }) => {
  return (
    <div className="add-budget-item">
      <div
        className="backdrop"
        onClick={() => actions.toggleNewItemDrawer(false)}
      />
      <Motion
        defaultStyle={{ y: 300 }}
        style={{ y: spring(isOpen ? 0 : 300, { stiffness: 110, damping: 13}) }}
      >
        {({ y }) => (
          <div
            className="drawer"
            style={{
              WebkitTransform: `translate3d(0, ${y}px, 0)`,
              transform: `translate3d(0, ${y}px, 0)`,
            }}
          >
            <h2>Record a Cost</h2>
          </div>
        )}
      </Motion>
    </div>
  );
};

AddBudgetItem.propTypes = {
  actions: PropTypes.object,
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
