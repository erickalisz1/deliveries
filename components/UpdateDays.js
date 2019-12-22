import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';

import { formatDate } from '../helper/helper';
import { updateDeliveroo, updateUber, updateHours } from '../helper/updates'
import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import Container from './Container';
import HoursModal from './HoursModal';
import DoneButton from './buttons/DoneButton';
import UpdateButton from './buttons/UpdateButton';
import LargeText from './LargeText';
import { inputStyle } from '../helper/Styles';

const UpdateDays = (props) => {

  const [delValue, setDelValue] = useState('');
  const [uberValue, setUberValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');

  const [displayHoursModal, setDisplayHoursModal] = useState(false);

  let day = props.dayToUpdate;

  if (day) {
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



    const setHours = (hours, minutes) => {
      setDisplayHoursModal(false);
      setHoursValue(hours + '.' + minutes);
    };

    return (

      <Modal transparent={true} visible={props.visible} animationType='slide'>

        <HoursModal visible={displayHoursModal} setHours={setHours} onClose={() => setDisplayHoursModal(false)} />
        <DismissKeyboard>
          {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
          <View style={{ flex: 1 }} >
            <View style={{ flex: 9 }} ></View>

            <Container modal={true} dark={false} >

              <View style={styles.inputRow}>
                <LargeText modal={true} >Updating:</LargeText>


                <View style={styles.selectDay}>
                  <Text style={styles.dayLabel} >{date}</Text>
                </View>
              </View>

              <View style={styles.inputRow}>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Deliveroo"
                    placeholderTextColor="#888"
                    style={inputStyle.input}
                    onChangeText={deliverooInput}
                    value={delValue}
                    keyboardType='decimal-pad' />

                  {/* moved the update statements to another file for cleaner code */}

                  <TouchableOpacity onPress={() => setDelValue(updateDeliveroo(day, delValue))}>
                    <UpdateButton />
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Uber"
                    placeholderTextColor="#888"
                    style={inputStyle.input}
                    onChangeText={uberInput}
                    value={uberValue}
                    keyboardType='decimal-pad' />

                  <TouchableOpacity onPress={() => setUberValue(updateUber(day, uberValue))}>
                    <UpdateButton />
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Hours"
                    placeholderTextColor="#888"
                    style={inputStyle.input}
                    onChangeText={hoursInput}
                    value={hoursValue}
                    keyboardType='decimal-pad'
                    onTouchStart={() => setDisplayHoursModal(true)}

                  />

                  <TouchableOpacity onPress={() => setHoursValue(updateHours(day, hoursValue))}>
                    <UpdateButton />
                  </TouchableOpacity>
                </View>



              </View>


              <TouchableOpacity onPress={props.onClose}>
                <DoneButton />
              </TouchableOpacity>



            </Container>

            <View style={{ flex: 9 }} ></View>
          </View>
        </DismissKeyboard>
      </Modal>


    );
  }
  else return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: Colours.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  title: {
    color: Colours.primaryText,
    fontSize: 18,
    margin: 10
  },
  selectDay: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colours.accent,
    marginLeft:20
  },
  dayLabel: {
    color: Colours.primaryText,
    fontSize: 20,
    textAlign:'center'
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent:'space-between'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 15
  },
});

export default UpdateDays;