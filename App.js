import React from 'react';
import firebase from 'firebase';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

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
import { dbInit } from './assets/helper/DB';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//create store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//initialize sqlite DB 
dbInit().then(() => {
  console.log('Initialized DB');
  
}).catch(error => {
  console.log('Failed initalizing DB'), error;
});

export default function App() {

  return (
    <Provider store={store}>
      <StackNav />
    </Provider>
  );
}