import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import FavoriteScreen from '../../screens/primary/Favorite';

const Stack = createStackNavigator();

const FavoriteStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="favorite-screen"
      component={FavoriteScreen}
      options={{
        title: 'My Favorite',
      }}
    />
  </Stack.Navigator>
);

export default FavoriteStack;
