import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashBoardScreen from '../../screens/DashBoard';

const Stack = createStackNavigator();

const DashBoardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="DashBoard"
      component={DashBoardScreen}
      options={{
        title: 'DashBoard',
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  </Stack.Navigator>
);

export default DashBoardStack;
