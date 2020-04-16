import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DashBoardStack from './stacks/DashBoardStack';
import ProfileStack from './stacks/ProfileStack';
import ProductsStack from './stacks/ProductsStack';
import AddNewProductStack from './stacks/AddNewProductStack';
import OrdersStack from './stacks/OrdersStack';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen name="DashBoard" component={DashBoardStack} />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: 'Profile',
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsStack}
        options={{
          title: 'Products',
        }}
      />
      <Drawer.Screen
        name="AddNewProduct"
        component={AddNewProductStack}
        options={{
          title: 'AddNewProduct',
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          title: 'Orders',
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MainDrawerNavigation;
