import React, { useState } from 'react';
import MainList from './screens/MainList';import firebase from 'firebase';
import { AppLoading } from 'expo';
import Deliveries from './Deliveries';


const firebaseConfig = {
  apiKey: "AIzaSyBtFpyI8rFywqiHm3rnL2qbS3L4Dl_Y8sk",
  authDomain: "deliveries-318f4.firebaseapp.com",
  databaseURL: "https://deliveries-318f4.firebaseio.com",
  projectId: "deliveries-318f4",
  storageBucket: "deliveries-318f4.appspot.com",
  messagingSenderId: "138527506874",
  appId: "1:138527506874:web:b77bf64674a2912ff1dd83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//COMMENT TO STOP QUERYING FIREBASE

let deliveriesList = [
  new Deliveries('0', '2018-02-26', 36, 0, 1),
];

//SELECT * STATEMENT

const renderList = () => {
  let query = firebase.database().ref('deliveries/').orderByKey();

  return query.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {

      let delivery = new Deliveries();

      let id = childSnapshot.key;

      delivery.dayNumber = id;
      delivery.actualDay = childSnapshot.child('actualDay');
      delivery.deliveroo = childSnapshot.child('deliveroo');
      delivery.uber = childSnapshot.child('uber');
      delivery.hours = childSnapshot.child('hours');

      deliveriesList.push(delivery);
      // console.log('ID: ' + delivery.dayNumber + ' ' + new Date().getMilliseconds() + 'ms');
    });

    // return deliveriesList;
  });
};

//read somewhere that .once returns a collection of objects, gotta change that

export default function App() {

  //COMMENT TO STOP QUERYING FIREBASE
  //using AppLoading to not render list before the data is fetched from firebase 
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    console.log('started at ' + new Date().getMilliseconds() + 'ms');
    console.log('finished at ' + new Date().getMilliseconds() + 'ms');
    return <AppLoading
      startAsync={renderList}
      onFinish={() => { setDataLoaded(true) }}
      onError={(err) => console.log(err)} />;
  }


  // checking
  console.log("list on App.js");
  
  console.log(deliveriesList);
  // console.log(DELIVERIES);



  return (

    <MainList firebaseList={deliveriesList} />

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
