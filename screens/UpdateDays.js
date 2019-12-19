import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import firebase from 'firebase';

import { formatDate } from '../helper/helper';
import Colours from '../constants/colours';

const UpdateDays = (props) => {

    // const [selectedDay, setSelectedDay] = useState('Select date to update');
    const [dayToUpdate, setDayToUpdate] = useState();

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

    const updateDeliveroo = (day, value) => 
    {
        firebase.database().ref('deliveries/'+day.dayNumber).set(
            {
              actualDay: day.actualDay,
              deliveroo: value,
              hours: day.hours,
              uber: day.uber
        
            }
          ).then(() => {
            console.log('Updated', day.actualDay);
          }).catch((error) => {
            console.log(error);
          });
    };

    return (
        <View style={styles.container}>

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
                value={uberValue} />
                <TextInput 
                placeholder="Hours"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={hoursInput}
                value={hoursValue} />
            </View>

            <View style={styles.inputs}>
                <Button title='Update' onPress={()=> updateDeliveroo(day, delValue)} />
                <Button title='Update' onPress={()=> updateUber(day, uberValue)} />
                <Button title='Update' onPress={()=> updateHours(day, hoursValue)} />
            </View>

        </View>
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
    inputs:{
        display:'flex',
        flexDirection:'row',
        padding:5,
        margin:5
    },
    input: {
        flex:1,
        borderColor: '#323232',
        borderWidth: 1,
        margin: 10,
        padding: 10,
        textAlign: "center",
        fontSize: 20,
        color: '#323232'
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