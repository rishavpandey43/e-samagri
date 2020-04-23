import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStack from './stacks/HomeStack';
import AccountStack from './stacks/AccountStack';
import FavoriteStack from './stacks/FavoriteStack';
import OrdersStack from './stacks/OrdersStack';
import HelpStack from './stacks/HelpStack';

import variable from '../styles/variables.js';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen
        name="home-stack"
        component={HomeStack}
        options={{
          drawerLabel: 'Home',
          drawerIcon: () => (
            <Icon name="home" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile-stack"
        component={AccountStack}
        options={{
          drawerLabel: 'My Account',
          drawerIcon: () => (
            <Icon name="user" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="favorite-stack"
        component={FavoriteStack}
        options={{
          drawerLabel: 'My Favorites',
          drawerIcon: () => (
            <Icon name="heart" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="orders-stack"
        component={OrdersStack}
        options={{
          drawerLabel: 'Orders History',
          drawerIcon: () => (
            <Icon name="history" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="help-stack"
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
