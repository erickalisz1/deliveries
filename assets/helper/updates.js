import { Alert } from 'react-native';
import firebase from 'firebase';
import { formatDate, fireRef } from './helper';

export const updateDeliveroo = (day,value) => {

  const userID = firebase.auth().currentUser.uid+"/";

    if (value.length >= 1) {//if theres data
      day.deliveroo = Number(value);

      firebase.database().ref(fireRef + userID + day.dayNumber).set(
        {
          actualDay: day.actualDay,
          deliveroo: day.deliveroo,
          hours: day.hours,
          uber: day.uber
        }
      ).then(() => {
        console.log('Updated', formatDate(day.actualDay));
        Alert.alert('Updated '+ formatDate(day.actualDay), 'Deliveroo set to ' + day.deliveroo);

      }).catch((error) => {
        console.log(error);
        Alert.alert('Error', error);
      });
    }
    else {
      Alert.alert('Error', 'Please provide a value');
    }

    return '';//made all fnctions return an empty string because that is what i my function needs to return on the modal its called from
  };

 export const updateUber = (day, value) => {

  const userID = firebase.auth().currentUser.uid+"/";
  
    if (value.length >= 1) {//if theres data
      day.uber = Number(value);

      firebase.database().ref(fireRef + userID + day.dayNumber).set(
        {
          actualDay: day.actualDay,
          deliveroo: day.deliveroo,
          hours: day.hours,
          uber: day.uber
        }
      ).then(() => {
        console.log('Updated', formatDate(day.actualDay));
        Alert.alert('Updated '+ formatDate(day.actualDay), 'Uber set to ' + day.uber);

      }).catch((error) => {
        console.log(error);
        Alert.alert('Error', error);
      });
    }
    else {
      Alert.alert('Error', 'Please provide a value');
    }

    return '';//made all fnctions return an empty string because that is what i my function needs to return on the modal its called from
  };

 export const updateHours = (day, value) => {

  const userID = firebase.auth().currentUser.uid+"/";

    if (value.length >= 1) {//if theres data
      day.hours = Number(value);

      firebase.database().ref(fireRef + userID + day.dayNumber).set(
        {
          actualDay: day.actualDay,
          deliveroo: day.deliveroo,
          hours: day.hours,
          uber: day.uber
        }
      ).then(() => {
        console.log('Updated', formatDate(day.actualDay));
        Alert.alert('Updated '+ formatDate(day.actualDay), 'Hours set to ' + day.hours);

      }).catch((error) => {
        console.log(error);
        Alert.alert('Error', error);
      });
    }
    else {
      Alert.alert('Error', 'Please provide a value');
    }

    return '';//made all fnctions return an empty string because that is what i my function needs to return on the modal its called from
  };