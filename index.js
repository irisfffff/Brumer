/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Countdown from './Countdown';
import {name as appName} from './app.json';
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';

const AppContainer = () => 
  <Provider store={store}>
    <App />
    <Countdown />
  </Provider>

AppRegistry.registerComponent(appName, () => AppContainer);
