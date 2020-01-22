import React, { useState } from 'react';
import firebase from 'firebase';
import { TextInput, Alert, View } from 'react-native';

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
import { firebaseConfig, fireRef } from './assets/helper/helper';
import Colours from './assets/constants/darkTheme';
import Container from './components/Container';
import LargeText from './components/LargeText';
import MyButton from './components/MyButton';
import { myStyles } from './assets/helper/Styles';
import Loading from './components/Loading';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameInput = (input) => {
    setUsername(input);
  };

  const passwordInput = (input) => {
    setPassword(input);
  };

  const firebaseLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).
      then(value => {

        let userID = firebase.auth().currentUser.uid;

        firebase.
          database().
          ref(fireRef).
          orderByKey().
          once('value').
          then(snapshot => {
            snapshot.forEach(child => {
              child.key === userID ? (
                firebase.auth().currentUser.displayName = child.val().firstName + ' ' + child.val().lastName
              )
                : null;
                console.log('currentUser.displayName:', firebase.auth().currentUser.displayName);
            });
          }).catch();

        console.log('userID:', userID);


      }).catch(error => console.log(error));
  };

  const displayUser = () => {
    Alert.alert('Current user', 'fetch list: ' + firebase.auth().currentUser.uid)
  };

  // const createUser = (email, password) => {
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then(userInfo => {
  //     console.log(userInfo);
  //   });
  // };

  // const firebaseLogout = (onSignedOut) => {
  //   firebase.auth().signOut().then(() => {});
  // };

  return (
    <Container>

      <LargeText modal={true}>Log in</LargeText>
      <TextInput
        placeholder={username}
        placeholderTextColor={Colours.primaryText}
        style={myStyles.input}
        onChangeText={usernameInput}
        value={username}
        keyboardType='decimal-pad'
      />
      <TextInput
        placeholder={password}
        placeholderTextColor={Colours.primaryText}
        style={myStyles.input}
        onChangeText={passwordInput}
        value={password}
        keyboardType='default'
        secureTextEntry={true}
      />
      <MyButton
        onPress={() => firebaseLogin(username, password)}
        text='Login'
        colour={Colours.success}
        textColour={Colours.black} />

      <MyButton
        onPress={() => displayUser()}
        text='Show user'
        colour={Colours.success}
        textColour={Colours.black} />


    </Container>
  );
}