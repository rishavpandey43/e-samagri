import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../screens/primary/Home';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="home"
      component={HomeScreen}
      options={{
        title: 'Home',
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
