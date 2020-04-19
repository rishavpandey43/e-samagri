import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OrdersScreen from '../../screens/primary/Orders';
import OrderDetailScreen from '../../screens/secondary/OrderDetail';

const Stack = createStackNavigator();

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="orders"
      component={OrdersScreen}
      options={{
        title: 'Orders History',
      }}
    />
    <Stack.Screen
      name="order-detail"
      component={OrderDetailScreen}
      options={{
        title: 'Order Detail',
      }}
    />
  </Stack.Navigator>
);

export default OrdersStack;
