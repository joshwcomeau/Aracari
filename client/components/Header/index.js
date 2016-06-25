import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

import { openDrawer } from 'ducks/drawer.duck';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

import { ADD_BUDGET_ITEM_DRAWER } from 'constants';
import '../../scss/header.scss';


const Header = ({ router, actions }) => {
  const isOnRootPage = window.location.pathname === '/';

  return (
    <AppBar
      id="header"
      style={{ fontFamily: 'inherit' }}
      zDepth={0}
      iconElementLeft={
        <IconButton onTouchTap={router.goBack}>
          <i
            className="material-icons"
            style={{ fontSize: '32px', lineHeight: '32px' }}
          >
            chevron_left
          </i>
        </IconButton>
      }
      iconElementRight={
        <IconButton onTouchTap={() => actions.openDrawer(ADD_BUDGET_ITEM_DRAWER)}>
          <i
            className="material-icons"
            style={{ fontSize: '32px', lineHeight: '32px' }}
          >
            add
          </i>
        </IconButton>
      }
      showMenuIconButton={!isOnRootPage}
    >
      <h1>Aracari</h1>
    </AppBar>
  );
};

Header.propTypes = {
  router: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = state => ({
  routing: state.routing,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    openDrawer,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
