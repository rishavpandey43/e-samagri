import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AddNewProductScreen from '../../screens/primary/AddNewProduct';

const Stack = createStackNavigator();

const AddNewProductStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="AddNewProduct"
      component={AddNewProductScreen}
      options={{
        title: 'AddNewProduct',
      }}
    />
  </Stack.Navigator>
);

export default AddNewProductStack;
