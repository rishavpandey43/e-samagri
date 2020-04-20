import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../screens/primary/Home';
import StoreScreen from '../../screens/secondary/Store';
import CartScreen from '../../screens/secondary/Cart';
import ItemScreen from '../../screens/secondary/Item';

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
    <Stack.Screen
      name="store-screen"
      component={StoreScreen}
      options={{
        title: 'Store Detail',
      }}
    />
    <Stack.Screen
      name="cart-screen"
      component={CartScreen}
      options={{
        title: 'Cart Detail',
      }}
    />
    <Stack.Screen
      name="item-screen"
      component={ItemScreen}
      options={{
        title: 'Item Detail',
      }}
    />
  </Stack.Navigator>
);

export default HomeStack;
