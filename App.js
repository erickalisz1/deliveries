import React from 'react';
import firebase from 'firebase';

//supress firebase warning on android
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

//my imports
import TabNavigator from './navigation/Navigator';
import { firebaseConfig } from './assets/helper/helper';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
      <TabNavigator />
  );
}