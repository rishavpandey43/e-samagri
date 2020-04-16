import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../../screens/Profile';

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
  </Stack.Navigator>
);

export default ProfileStack;
