import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WishListScreen from '../../screens/primary/WishList';

const Stack = createStackNavigator();

const WishListStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="wishList"
      component={WishListScreen}
      options={{
        title: 'My WishList',
      }}
    />
  </Stack.Navigator>
);

export default WishListStack;
