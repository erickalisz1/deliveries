import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity } from 'react-native';

import { formatDate } from '../helper/helper';
import { updateDeliveroo, updateUber, updateHours } from '../helper/updates'
import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import HoursModal from './HoursModal';
import DeliverooModal from '../components/DeliverooModal';
import DoneButton from './buttons/DoneButton';
import UpdateButton from './buttons/UpdateButton';
import LargeText from './LargeText';
import { inputStyle } from '../helper/Styles';
import ModalContainer from './ModalContainer';

const UpdateDays = (props) => {

  const [delValue, setDelValue] = useState('');
  const [uberValue, setUberValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');

  const [displayHoursModal, setDisplayHoursModal] = useState(false);
  const [displayDelModal, setDisplayDelModal] = useState(false);

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

    const setDel = (value) => {
      setDisplayDelModal(false);
      setDelValue(value+'');
    };

    return (

      <Modal transparent={true} visible={props.visible} animationType='slide'>

        <HoursModal visible={displayHoursModal} setHours={setHours} onClose={() => setDisplayHoursModal(false)} />
        <DeliverooModal visible={displayDelModal} setDel={setDel} onClose={() => setDisplayDelModal(false)} />

        <DismissKeyboard>
          {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
          <View style={{ flex: 1 }} >

{/* TODO: make this view 9 a touchable without feedback so we can close it when touching outside modal */}

            <View style={{ flex: 9 }} ></View>

            <ModalContainer dark={false} >

              <View style={styles.row}>

                <LargeText modal={true} >Updating:</LargeText>


                <View style={styles.selectDay}>
                  <Text style={styles.dayLabel} >{date}</Text>
                </View>
              </View>

              <View style={styles.row}>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Deliveroo"
                    placeholderTextColor={Colours.placeholder}
                    style={inputStyle.input}
                    onChangeText={deliverooInput}
                    value={delValue}
                    keyboardType='decimal-pad'                     
                    onTouchStart={() => setDisplayDelModal(true)}/>

                  {/* moved the update statements to another file for cleaner code */}

                  <TouchableOpacity onPress={() => setDelValue(updateDeliveroo(day, delValue))}>
                    <UpdateButton />
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Uber"
                    placeholderTextColor={Colours.placeholder}
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
                    placeholderTextColor={Colours.placeholder}
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


              <TouchableOpacity onPress={props.onClose} style={{marginTop:10}}>
                <DoneButton />
              </TouchableOpacity>



            </ModalContainer>

            <View style={{ flex: 9 }} ></View>
          </View>
        </DismissKeyboard>
      </Modal>


    );
  }
  else return null;
};

const styles = StyleSheet.create({
  selectDay: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colours.accent,
    marginLeft:5
  },
  dayLabel: {
    color: Colours.primaryText,
    fontSize: 20,
    textAlign:'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    justifyContent:'space-between'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 5
  },
});

export default UpdateDays;