import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DeliverNewOrder from '../../screens/primary/DeliverNewOrder';

const Stack = createStackNavigator();

const DeliverNewOrderStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="deliver-new-order-screen"
      component={DeliverNewOrder}
      options={{
        title: 'Help',
      }}
    />
  </Stack.Navigator>
);

export default DeliverNewOrderStack;
