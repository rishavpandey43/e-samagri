import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../../screens/primary/Profile';
import UpdateProfileScreen from '../../screens/secondary/UpdateProfile';

const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="profile-screen"
      component={ProfileScreen}
      options={{
        title: 'My Profile',
      }}
    />
    <Stack.Screen
      name="update-profile-screen"
      component={UpdateProfileScreen}
      options={{
        title: 'Update Profile',
      }}
    />
  </Stack.Navigator>
);

export default AccountStack;
