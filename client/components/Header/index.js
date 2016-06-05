import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleNewItemDrawer } from 'ducks/budget.duck';
import '../../scss/header.scss';

function renderHeaderButton({ name, shown, action }) {
  const buttonClasses = classNames(name, { shown });

  return (
    <button className={buttonClasses} onClick={action}>
      <i className="material-icons">{name}</i>
    </button>
  );
}

const Header = ({ isAddButtonShown, isBackButtonShown, actions }) => {
  return (
    <header id="header">
      Aracari

      {renderHeaderButton({
        name: 'add',
        shown: isAddButtonShown,
        action() { actions.toggleNewItemDrawer(true); },
      })}
      {renderHeaderButton({
        name: 'back',
        shown: isBackButtonShown,
        action() { actions.toggleNewItemDrawer(false); },
      })}
    </header>
  );
};

Header.propTypes = {
  isAddButtonShown: PropTypes.bool,
  isBackButtonShown: PropTypes.bool,
  actions: PropTypes.object,
}


function mapStateToProps(state) {
  const addingItem = state.budget.get('addingNewItem');

  return {
    isAddButtonShown: !addingItem,
    isBackButtonShown: addingItem,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleNewItemDrawer,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
