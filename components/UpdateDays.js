import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import { formatDate } from '../helper/helper';
import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import Container from './Container';
import HoursModal from './HoursModal';

const UpdateDays = (props) => {

  const [delValue, setDelValue] = useState('');
  const [uberValue, setUberValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');

  const [displayHoursModal, setDisplayHoursModal] = useState(false);

  let day = props.dayToUpdate;

  if(day)
  {
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
      if(JSON.stringify(value).length > 0)
      {//if theres data
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
            console.log('Updated', formatDate(day.actualDay));
            Alert.alert('Updated', formatDate(day.actualDay) + '\nwas successfully updated\nDeliveroo set to ' + day.deliveroo);
            setDelValue('');

          }).catch((error) => {
            console.log(error);
            Alert.alert('Error',error);
          });
      }
      else
      {
        Alert.alert('Error','Please provide a value');
      }
    };

    const updateUber = (value) => 
    {
      if(JSON.stringify(value).length > 0)
      {//if theres data
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
            console.log('Updated', formatDate(day.actualDay));
            Alert.alert('Updated', formatDate(day.actualDay) + '\nwas successfully updated\nUber set to ' + day.uber);
            setUberValue('');

          }).catch((error) => {
            console.log(error);
            Alert.alert('Error',error);
          });
        }
        else
        {
          Alert.alert('Error','Please provide a value');
        }
    };

    const updateHours = (value) => 
    {
      if(JSON.stringify(value).length > 0)
      {//if theres data
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
            console.log('Updated', formatDate(day.actualDay));
            Alert.alert('Updated', formatDate(day.actualDay) + '\nwas successfully updated\nhours set to ' + day.hours );
            setHoursValue('');

          }).catch((error) => {
            console.log(error);
            Alert.alert('Error',error);
          });
        }
        else
        {
          Alert.alert('Error','Please provide a value');
        }
    };

    const setHours = (hours, minutes) => {
      setDisplayHoursModal(false);
      setHoursValue(hours+'.'+minutes);
    };

    return (
      
        <Modal transparent={true} visible={props.visible} animationType='slide'>

          <HoursModal visible={displayHoursModal} setHours={setHours} />
          
        <View style={{flex:3}} ></View>
        <DismissKeyboard>
        <View style={styles.container} >
        
          
          <Text style={styles.title} >Updating:</Text>

          
          <View style={styles.selectDay}>
              <Text style={styles.dayLabel} >{date}</Text>
          </View>

          
          <View style={styles.inputRow}>

            <View style={styles.column}>
              <TextInput 
                placeholder="Deliveroo"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={deliverooInput}
                value={delValue}
                keyboardType='decimal-pad' />

              <TouchableOpacity style={styles.updateBtn} onPress={()=> updateDeliveroo(delValue)}>
                <View>
                    <Text style={styles.updateBtnText}>Update</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.column}>
              <TextInput 
              placeholder="Uber"
              placeholderTextColor="#888"
              style={styles.input}
              onChangeText={uberInput}
              value={uberValue}
              keyboardType='decimal-pad'  />

                <TouchableOpacity style={styles.updateBtn} onPress={()=> updateUber(uberValue)}>
                  <View>
                      <Text style={styles.updateBtnText}>Update</Text>
                  </View>
                </TouchableOpacity>
              </View>                      

              <View style={styles.column}>
                <TextInput 
                placeholder="Hours"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={hoursInput}
                value={hoursValue} 
                keyboardType='decimal-pad' 
                onTouchStart={() => setDisplayHoursModal(true)}

                />

                <TouchableOpacity style={styles.updateBtn} onPress={()=> updateHours(hoursValue)}>
                  <View>
                      <Text style={styles.updateBtnText}>Update</Text>
                  </View>
                </TouchableOpacity>
              </View>

              

          </View>
          

          <TouchableOpacity style={styles.cancel} onPress={props.onClose}>
                <View>
                  <Text style={styles.cancelText}>Done</Text>
                </View>
              </TouchableOpacity>

             
        
        </View>

        </DismissKeyboard>
        <View style={{flex:3}} ></View>

        </Modal>
        
      
    );
  }
  else return null;
};

const styles = StyleSheet.create({
  container:{
    flex: 4,
    backgroundColor: Colours.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:50
},
  title: {
    color: Colours.primaryText,
    fontSize: 18,
    margin:10
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
  inputRow:{
    display:'flex',
    flexDirection:'row',
    marginVertical:20
  },
  input: {
    flex:1,
    borderBottomColor: Colours.selected,
    borderBottomWidth: 1,
    margin:5,
    padding: 5,
    textAlign: "center",
    fontSize: 20,
    color: Colours.primaryText,
    minHeight:35
  },
  updateBtn: {
    margin: 10,
    padding:10,
    borderRadius: 15,
    backgroundColor: Colours.selected,
    minHeight:30
  },
  updateBtnText:{
    fontSize: 20,
    color: Colours.background,
    textAlign: 'center',
  },
  column:{
    display:'flex',
    flexDirection:'column',
    marginHorizontal:15
  },
  cancel: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colours.cancel,
    marginVertical:20
},
cancelText:{
    fontSize: 24,
    color: Colours.primaryText,
    textAlign: 'center',
}
});

export default UpdateDays;