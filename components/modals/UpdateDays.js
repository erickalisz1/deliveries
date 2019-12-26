import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Platform } from 'react-native';

import { formatDate } from '../../assets/helper/helper';
import { updateDeliveroo, updateUber, updateHours } from '../../assets/helper/updates'
import Colours from '../../assets/constants/darkTheme';
import DismissKeyboard from '../DismissKeyboard';
import HoursModal from './HoursModal';
import DeliverooModal from '../modals/DeliverooModal';
import { myStyles } from '../../assets/helper/Styles';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';

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
      setDelValue(value + '');
    };

    return (

      <Modal transparent={true} visible={props.visible} animationType='slide'>

        <HoursModal visible={displayHoursModal} setHours={setHours} onClose={() => setDisplayHoursModal(false)} />
        <DeliverooModal visible={displayDelModal} setDel={setDel} onClose={() => setDisplayDelModal(false)} />

        <DismissKeyboard>
          {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
          <View style={{ flex: 1 }} >

            <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 11 : 15} />

            <ModalContainer dark={false} smaller={false}>

              <View style={styles.row}>

                <View style={styles.selectDay}>
                  <Text style={styles.dayLabel} >{date}</Text>
                </View>
              </View>

              <View style={styles.row}>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Deliveroo"
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={deliverooInput}
                    value={delValue}
                    keyboardType='decimal-pad'
                    onTouchStart={() => setDisplayDelModal(true)} />

                  {/* moved the update statements to another file for cleaner code */}

                  <TouchableOpacity onPress={() => setDelValue(updateDeliveroo(day, delValue))}>
                    <MyButton text='Update' colour={Colours.selected} textColour={Colours.black} />
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Uber"
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={uberInput}
                    value={uberValue}
                    keyboardType='decimal-pad' />

                  <TouchableOpacity onPress={() => { console.log('uber:', uberValue); setUberValue(updateUber(day, uberValue)) }}>
                    <MyButton text='Update' colour={Colours.selected} textColour={Colours.black} />
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <TextInput
                    placeholder="Hours"
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={hoursInput}
                    value={hoursValue}
                    keyboardType='decimal-pad'
                    onTouchStart={() => setDisplayHoursModal(true)}

                  />

                  <TouchableOpacity onPress={() => setHoursValue(updateHours(day, hoursValue))}>
                    <MyButton text='Update' colour={Colours.selected} textColour={Colours.black} />
                  </TouchableOpacity>
                </View>



              </View>

            </ModalContainer>

            <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 11 : 15} />

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
  },
  dayLabel: {
    color: Colours.primaryText,
    fontSize: 20,
    textAlign: 'center'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:15
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex:1,
    marginHorizontal: 5
  },
});

export default UpdateDays;