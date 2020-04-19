import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStack from './stacks/HomeStack';
import AccountStack from './stacks/AccountStack';
import WishListStack from './stacks/WishListStack';
import OrdersStack from './stacks/OrdersStack';
import HelpStack from './stacks/HelpStack';

import variable from '../styles/variables.js';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen
        name="home"
        component={HomeStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => (
            <Icon name="home" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        component={AccountStack}
        options={{
          drawerLabel: 'My Account',
          drawerIcon: () => (
            <Icon name="user" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="wishlist"
        component={WishListStack}
        options={{
          drawerLabel: 'My Wishlists',
          drawerIcon: () => (
            <Icon name="heart" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        component={OrdersStack}
        options={{
          drawerLabel: 'Orders History',
          drawerIcon: () => (
            <Icon name="history" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="help"
        component={HelpStack}
        options={{
          drawerLabel: 'Help',
          drawerIcon: () => (
            <Icon name="question" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MainDrawerNavigation;
