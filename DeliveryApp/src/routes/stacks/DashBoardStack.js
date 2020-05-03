import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashBoardScreen from '../../screens/primary/DashBoard';

const Stack = createStackNavigator();

const DashBoardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="dashBoard-screen"
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
