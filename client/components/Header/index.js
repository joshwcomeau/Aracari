import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleDrawer } from 'ducks/drawer.duck';
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
        action() { actions.toggleDrawer('add-budget-item'); },
      })}
      {renderHeaderButton({
        name: 'back',
        shown: isBackButtonShown,
        action() { /* TODO */ },
      })}
    </header>
  );
};

Header.propTypes = {
  isAddButtonShown: PropTypes.bool,
  isBackButtonShown: PropTypes.bool,
  actions: PropTypes.object,
};


function mapStateToProps(state) {
  const drawerOpen = state.drawer;
  console.log(state.drawer)

  return {
    isAddButtonShown: !drawerOpen,
    isBackButtonShown: false, // TODO
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleDrawer,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
