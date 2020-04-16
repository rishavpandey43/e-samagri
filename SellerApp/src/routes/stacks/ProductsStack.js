import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductsScreen from '../../screens/Products';
import ProductDetailScreen from '../../screens/ProductDetail';

const Stack = createStackNavigator();

const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        title: 'Products',
      }}
    />
    <Stack.Screen
      name="Product Detail"
      component={ProductDetailScreen}
      options={{
        title: 'Product Detail',
      }}
    />
  </Stack.Navigator>
);

export default ProductsStack;
