import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../../screens/primary/Profile';
import UpdateProfileScreen from '../../screens/secondary/UpdateProfile';

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profile',
      }}
    />
    <Stack.Screen
      name="edit-profile"
      component={UpdateProfileScreen}
      options={{
        title: 'Profile',
      }}
    />
  </Stack.Navigator>
);

export default ProfileStack;
