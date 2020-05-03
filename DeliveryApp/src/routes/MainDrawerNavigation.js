import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DashBoardStack from './stacks/DashBoardStack';
import ProfileStack from './stacks/ProfileStack';
import OrdersStack from './stacks/OrdersStack';
import SettingStack from './stacks/SettingStack';

import variable from '../styles/variables.js';

const Drawer = createDrawerNavigator();

const MainDrawerNavigation = () => (
  <NavigationContainer>
    <Drawer.Navigator>
      <Drawer.Screen
        name="dashBoard-stack"
        component={DashBoardStack}
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: () => (
            <Icon name="dashboard" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile-stack"
        component={ProfileStack}
        options={{
          drawerLabel: 'Profile',
          drawerIcon: () => (
            <Icon name="user" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="orders-stack"
        component={OrdersStack}
        options={{
          drawerLabel: 'Orders',
          drawerIcon: () => (
            <Icon name="reorder" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="setting-stack"
        component={SettingStack}
        options={{
          drawerLabel: 'Setting',
          drawerIcon: () => (
            <Icon name="cogs" size={30} color={variable.mainThemeColor} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default MainDrawerNavigation;
