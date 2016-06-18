import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleDrawer } from 'ducks/drawer.duck';
import HeaderButton from 'components/HeaderButton';
import '../../scss/header.scss';


const Header = ({ isAddButtonShown, isBackButtonShown, actions }) => {
  return (
    <header id="header">
      Aracari

      <HeaderButton
        name="add"
        shown={isAddButtonShown}
        action={() => { actions.toggleDrawer('add-budget-item'); }}
      />
      <HeaderButton
        name="back"
        shown={isBackButtonShown}
        action={() => { /* TODO */ }}
      />
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
