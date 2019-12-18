import React, { useState } from 'react';
import { View } from 'react-native';
import MainList from './screens/MainList';
import firebase from 'firebase';
import Deliveries from './Deliveries';
import Loading from './components/Loading';

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

//read somewhere that .once returns a collection of objects, gotta change that

export default function App() {

  // const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveriesList, setDeliveriesList] = useState([]);

  const renderList = () => {
    let localList = [];

    console.log('calling render function at ', new Date().getMilliseconds() + 'ms')

    let query = firebase.database().ref('deliveries/').orderByKey();

    //SELECT * STATEMENT
    query.once('value').then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {

        const delivery = new Deliveries();

        let id = childSnapshot.key;

        delivery.dayNumber = id;
        delivery.actualDay = childSnapshot.val().actualDay;
        delivery.deliveroo = childSnapshot.val().deliveroo;
        delivery.uber = childSnapshot.val().uber;
        delivery.hours = childSnapshot.val().hours;
        delivery.total = delivery.deliveroo + delivery.uber;

        delivery.hours > 0 ? (delivery.per = delivery.total/delivery.hours) : (delivery.per = 0);

        // console.log('Hours: '+ delivery.hours, 'Per: '+ delivery.per );

        localList.push(delivery);

      });

      //finished building list
      console.log('finished building list at ', new Date().getMilliseconds() + 'ms');
    }).then(() => { listLoaded(localList); });
  };


  function listLoaded(loadedList) {
    setIsLoading(false);
    setDeliveriesList(loadedList);
  }

  //conditional rendering
  isLoading ? renderList() : '';

  return (
    <View style={{ flex: 1 }}>

      {isLoading ? (<Loading />) : (<MainList firebaseList={deliveriesList} />)}

    </View>
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