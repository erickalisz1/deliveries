import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import firebase from 'firebase';

import { formatDate } from '../helper/helper';
import Colours from '../constants/colours';
import DismissKeyboard from '../components/DismissKeyboard';

const UpdateDays = (props) => {

    const [delValue, setDelValue] = useState('');
    const [uberValue, setUberValue] = useState('');
    const [hoursValue, setHoursValue] = useState('');

    let day = props.navigation.getParam('day');
    let date = formatDate(day.actualDay);

    console.log('updating:', date);


    const deliverooInput = (enteredValue) => {
        setDelValue(enteredValue);
    };

    const uberInput = (enteredValue) => {
        setUberValue(enteredValue);
    };

    const hoursInput = (enteredValue) => {
        setHoursValue(enteredValue);
    };

    const updateDeliveroo = (value) => 
    {
        day.deliveroo = Number(value);

        firebase.database().ref('deliveries/'+day.dayNumber).set(
            {
              actualDay: day.actualDay,
              deliveroo: day.deliveroo,
              hours: day.hours,
              uber: day.uber
            }
          ).then(() => 
          {
            
            console.log('Updated', day.actualDay);
            Alert.alert('Updated', day.actualDay + '\nwas successfully updated');
            setDelValue('');

          }).catch((error) => {
            console.log(error);
          });
    };

    const updateUber = (value) => 
    {
        day.uber = Number(value);

        firebase.database().ref('deliveries/'+day.dayNumber).set(
            {
              actualDay: day.actualDay,
              deliveroo: day.deliveroo,
              hours: day.hours,
              uber: day.uber
            }
          ).then(() => 
          {
            
            console.log('Updated', day.actualDay);
            Alert.alert('Updated', day.actualDay + '\nwas successfully updated');
            setUberValue('');

          }).catch((error) => {
            console.log(error);
          });
    };

    const updateHours = (value) => 
    {
        day.hours = Number(value);

        firebase.database().ref('deliveries/'+day.dayNumber).set(
            {
              actualDay: day.actualDay,
              deliveroo: day.deliveroo,
              hours: day.hours,
              uber: day.uber
            }
          ).then(() => 
          {
            
            console.log('Updated', day.actualDay);
            Alert.alert('Updated', day.actualDay + '\nwas successfully updated');
            setHoursValue('');

          }).catch((error) => {
            console.log(error);
          });
    };

    return (
        <DismissKeyboard>

            <View style={styles.container}>
            
                <Text style={styles.title} >Updating: </Text>
                <View style={styles.selectDay}>
                    <Text style={styles.dayLabel} >{date}</Text>
                </View>

                <View style={styles.inputs}>
                    <TextInput 
                    placeholder="Deliveroo"
                    placeholderTextColor="#888"
                    style={styles.input}
                    onChangeText={deliverooInput}
                    value={delValue}
                    keyboardType='decimal-pad' />
                    <TextInput 
                    placeholder="Uber"
                    placeholderTextColor="#888"
                    style={styles.input}
                    onChangeText={uberInput}
                    value={uberValue}
                    keyboardType='decimal-pad'  />
                    <TextInput 
                    placeholder="Hours"
                    placeholderTextColor="#888"
                    style={styles.input}
                    onChangeText={hoursInput}
                    value={hoursValue} 
                    keyboardType='decimal-pad' />
                </View>

                <View style={styles.inputs}>
                    <Button title='Update' onPress={()=> updateDeliveroo(delValue)} />
                    <Button title='Update' onPress={()=> updateUber(uberValue)} />
                    <Button title='Update' onPress={()=> updateHours(hoursValue)} />
                </View>
                
            </View>
        </DismissKeyboard>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 36,
        color: Colours.primaryText
    },
    selectDay: {
        padding: 15,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: Colours.accent
    },
    dayLabel: {
        color: Colours.primaryText,
        fontSize: 18,
    },
    title: {
        color: Colours.primaryText,
        fontSize: 18,
        margin:10
    },
    inputs:{
        display:'flex',
        flexDirection:'row',
        padding:5,
    },
    input: {
        flex:1,
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        margin:10,
        padding: 5,
        textAlign: "center",
        fontSize: 20,
        color: Colours.primaryText
    },
});

export default UpdateDays;

//INSERT / UPDATE STATEMENT
  /*
    firebase.database().ref('deliveries/1').set(
      {
        actualDay: "15-09-2019",
        deliveroo: "37.05",
        hours: "2.25",
        uber: "76"
  
      }
    ).then(() => {
      console.log('INSERTED !');
    }).catch((error) => {
      console.log(error);
    });
     */