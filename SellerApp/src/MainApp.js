import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

// * This consist of only two screens, i.e Register & Login
import MainTabNavigation from './routes/MainTabNavigation';

// * Rest screens on successfull authentication
import MainDrawerNavigation from './routes/MainDrawerNavigation';

const MainApp = ({auth}) => {
  useEffect(() => {
    permissionStatus
      .then(res => {
        messageListener();
      })
      .catch(err => {
        permissionGranted
          .then(res => {})
          .catch(err => {
            console.log('User canceled the permission');
          });
      });
  }, []);

  const permissionStatus = messaging().hasPermission();
  const permissionGranted = messaging().requestPermission();

  const messageListener = () => {
    messaging().onMessage(message => {
      console.log('onMessageListener-', message);
    });

    messaging().onNotificationOpenedApp(notification => {
      console.log('notificationOpenListener-', notification);
    });

    messaging().getInitialNotification(notification => {
      console.log('initialNotificationListener-', notification);
    });
  };

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
