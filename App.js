import React from 'react';
import firebase from 'firebase';

import TabNavigator from './navigation/Navigator';
import { firebaseConfig } from './assets/helper/helper';

// // Initialize Firebase
firebase.initializeApp(firebaseConfig);

//COMMENT TO STOP QUERYING FIREBASE

//read somewhere that .once returns a collection of objects, gotta change that

export default function App() {

  return (
    <TabNavigator />
  );

  //INSERT / UPDATE STATEMENT
  /*
    firebase.database().ref('deliveries/1').set(
      {
        ActualDay: "15-09-2019",
        deliveroo: "37.05",
        hoursWorked: "2.25",
       uber: "76"
  
      }
    ).then(() => {
      console.log('INSERTED !');
    }).catch((error) => {
      console.log(error);
    });
     */

  //vars declared outside of code are defined as global scoped
  // let scope is more narrow, which is why is more preferred now with ES6

  //console debugging
  // firebase.database().ref('deliveries/333').once('value', (data) => {
  //   console.log(data.child('actualDay'));
  // });


}