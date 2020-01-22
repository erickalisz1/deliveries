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
import User from './assets/models/User';
import Loading from './components/Loading';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  // const [user, setUser] = useState(null);

  const usernameInput = (input) => {
    setUsername(input);
  };

  const passwordInput = (input) => {
    setPassword(input);
  };

  const fetchUsers = () => {
    let localList = [];

    console.log('Fetching Users...');

    let query = firebase.database().ref(fireRef).orderByKey();

    // SELECT * STATEMENT
    query.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        const user = new User();

        let id = childSnapshot.key;

        user.UserID = Number(id);
        user.username = childSnapshot.val().username;
        user.password = childSnapshot.val().password;
        user.firstName = childSnapshot.val().firstName;
        user.lastName = childSnapshot.val().lastName;

        localList.push(user);
      });

      //finished building list

    }).then(() => { listLoaded(localList) });
  };

  const listLoaded = (loadedList) => {
    setIsLoading(false);
    setUserList(loadedList);
    console.log(loadedList);
  }

  const searchUser = (u, p) => {

    let currentUser = null;

    userList.forEach(user => {
      if (user.username === u && user.password === p) {
        currentUser = user;

        firebase.auth().currentUser = user;
        firebase.auth().currentUser.u

      }
    });

    currentUser !== null ? console.log(currentUser) : Alert.alert("Wrong username or password");



    // return (<TabNavigator screenProps={{user:user}} />);

  };

  const firebaseLogin = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password).
      then(user => {
        console.log(user);
        

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

  isLoading ? fetchUsers() : null;

  return (
    <Container dark={true}>
      {isLoading ? <Loading /> :
        <View>
          <LargeText>Log in</LargeText>
          <TextInput
            placeholder={username}
            placeholderTextColor={Colours.placeholder}
            style={myStyles.input}
            onChangeText={usernameInput}
            value={username}
            keyboardType='decimal-pad'
          />
          <TextInput
            placeholder={password}
            placeholderTextColor={Colours.placeholder}
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

        </View>

      }

    </Container>
  );
}