import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ProductsScreen from '../../screens/primary/Products';
import ProductDetailScreen from '../../screens/secondary/ProductDetail';

const Stack = createStackNavigator();

const ProductsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name="products-screen"
      component={ProductsScreen}
      options={{
        title: 'Products',
      }}
    />
    <Stack.Screen
      name="product-detail-screen"
      component={ProductDetailScreen}
      options={{
        title: 'Product Detail',
      }}
    />
  </Stack.Navigator>
);

export default ProductsStack;
