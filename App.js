import React from 'react';
import firebase from 'firebase';
import { createStore } from 'redux'
import { Provider } from 'react-redux';
// import * as DarkMode from 'react-native-dark-mode';

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
import StackNav from './navigation/Navigator';
import { firebaseConfig } from './assets/helper/helper';
import rootReducer from './store';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create store
const store = createStore(rootReducer);

export default function App() {

  // initialMode = useDarkModeContext();
  // DarkMode.initialMode = "dark";
   

  return (
    <Provider store={store}>
      <StackNav />
    </Provider>
  );
}