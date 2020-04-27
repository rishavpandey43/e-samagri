import React from 'react';
import {Icon} from 'react-native-elements';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import RegisterScreen from '../screens/primary/Register';
import LoginScreen from '../screens/primary/Login';

import variables from '../styles/variables.js';

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'register-screen') {
            iconName = 'user-plus';
          } else if (route.name === 'login-screen') {
            iconName = 'home';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              type="font-awesome"
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: variables.mainThemeColor,
        inactiveTintColor: 'gray',
        labelStyle: {fontSize: 18},
      }}>
      <Tab.Screen
        name="register-screen"
        component={RegisterScreen}
        options={{
          tabBarLabel: 'Register',
          // tabBarIcon: () => (
          //   <Icon name="user-plus" type="font-awesome" size={30} />
          // ),
        }}
      />
      <Tab.Screen
        name="login-screen"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Login',
          // tabBarIcon: () => <Icon name="home" type="font-awesome" size={30} />,
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default MainTabNavigation;
