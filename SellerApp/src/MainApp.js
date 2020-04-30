import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// * This consist of only two screens, i.e Register & Login
import MainTabNavigation from './routes/MainTabNavigation';

// * Rest screens on successfull authentication
import MainDrawerNavigation from './routes/MainDrawerNavigation';

const MainApp = ({auth}) => {
  return auth.isAuthenticated ? (
    <MainDrawerNavigation />
  ) : (
    <MainTabNavigation />
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({}, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainApp);
