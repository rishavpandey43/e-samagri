import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrdersScreen from '../../screens/Orders';
import OrderDetailScreen from '../../screens/OrderDetail';

const Stack = createStackNavigator();

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{
        title: 'Orders',
      }}
    />
    <Stack.Screen
      name="Order Detail"
      component={OrderDetailScreen}
      options={{
        title: 'Order Detail',
      }}
    />
  </Stack.Navigator>
);

export default OrdersStack;
