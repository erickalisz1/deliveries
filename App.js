import React, { useState } from 'react';
import firebase from 'firebase';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

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
import Login from './screens/Login';
import rootReducer from './store';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create store
const store = createStore(rootReducer);

export default function App() {

  const [isUserSignedIn, setisUserSignedIn] = useState(false);

  const getResult = (result) => {
    //cant access Store here because it is outside <Provider>
  setisUserSignedIn(result);
  };

  return (
    <Provider store={store}>
      {!isUserSignedIn ? <Login result={getResult} /> : <TabNavigator  />}
    </Provider>
  );
}