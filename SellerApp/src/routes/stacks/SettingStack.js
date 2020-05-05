import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SettingScreen from '../../screens/primary/Setting';

const Stack = createStackNavigator();

const SettingStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="setting-screen"
      component={SettingScreen}
      options={{
        title: 'Setting',
      }}
    />
  </Stack.Navigator>
);

export default SettingStack;
