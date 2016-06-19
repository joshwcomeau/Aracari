import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { toggleDrawer } from 'ducks/drawer.duck';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import '../../scss/header.scss';


const Header = ({ actions }) => {
  return (
    <AppBar
      id="header"
      style={{ fontFamily: 'inherit' }}
      zDepth={0}
      iconElementRight={
        <IconButton onTouchTap={() => actions.toggleDrawer('add-budget-item')}>
          <i
            className="material-icons"
            style={{ fontSize: '32px', lineHeight: '32px' }}
          >
            add
          </i>
        </IconButton>
      }
      iconStyleRight={{
        fontSize: '30px',
      }}
      showMenuIconButton={false}
    >
      <h1>Aracari</h1>
    </AppBar>
  );
};

Header.propTypes = {
  actions: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      toggleDrawer,
    }, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Header);
