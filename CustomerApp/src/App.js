/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';

import store from './store/store';

import MainDrawerNavigation from './routes/MainDrawerNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <MainDrawerNavigation />
    </Provider>
  );
};

export default App;
