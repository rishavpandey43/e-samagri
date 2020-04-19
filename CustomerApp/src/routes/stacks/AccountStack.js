import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AccountScreen from '../../screens/primary/Account';

const Stack = createStackNavigator();

const AccountStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="account"
      component={AccountScreen}
      options={{
        title: 'My Account',
      }}
    />
  </Stack.Navigator>
);

export default AccountStack;
