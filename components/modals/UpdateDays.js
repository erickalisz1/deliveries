import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, TouchableOpacity, Platform } from 'react-native';
import { useDispatch } from 'react-redux';

import { formatDate } from '../../assets/helper/helper';
import { updateDeliveroo, updateUber, updateHours } from '../../assets/helper/updates'
import Colours from '../../assets/constants/Colours';
import DismissKeyboard from '../DismissKeyboard';
import HoursModal from './HoursModal';
import DeliverooModal from '../modals/DeliverooModal';
import { myStyles } from '../../assets/helper/Styles';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { Ionicons } from '@expo/vector-icons';
import SmallText from '../SmallText';
import Row from '../Row';
import { ACTIONS } from '../../store/actions/actions';

const UpdateDays = (props) => {

  const [delValue, setDelValue] = useState('');
  const [uberValue, setUberValue] = useState('');
  const [hoursValue, setHoursValue] = useState('');

  const [displayHoursModal, setDisplayHoursModal] = useState(false);
  const [displayDelModal, setDisplayDelModal] = useState(false);

  const dispatch = useDispatch();

  const refreshSummary = () => {
    dispatch({
      type: ACTIONS.SHOULD_REFRESH_SUMMARY,
      value: true
    });
  };

  let day = props.dayToUpdate;

  if (day) {
    let date = formatDate(day.actualDay);

    //console.log('selected:', day.dayNumber); //console debugging

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

    const showPrevious = () => {
      props.next(day.dayNumber, '<');
    };

    const showNext = () => {
      props.next(day.dayNumber, '>');
    };

    return (

      <Modal transparent={true} visible={props.visible} animationType='slide'>

        <HoursModal visible={displayHoursModal} setHours={setHours} onClose={() => setDisplayHoursModal(false)} />
        <DeliverooModal visible={displayDelModal} setDel={setDel} onClose={() => setDisplayDelModal(false)} />

        <DismissKeyboard>
          {/* needed to wrap this whole thing into another view so my keyboard dismiss works */}
          <View style={{ flex: 1 }} >

            <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 20 : 15} />

            <ModalContainer marginHorizontal={20} minHeight={215} >

              <View style={styles.row}>
                <TouchableOpacity onPress={() => showPrevious()} style={{ marginHorizontal: 10, padding: 20 }}>

                  <Ionicons name='ios-arrow-back' size={30} color={Colours.primaryText} />

                </TouchableOpacity>

                <View style={styles.selectDay}>
                  <Text style={myStyles.modalDescriptionLarge} >{date}</Text>
                </View>

                <TouchableOpacity onPress={() => showNext()} style={{ marginHorizontal: 10, padding: 20 }}>

                  <Ionicons name='ios-arrow-forward' size={30} color={Colours.primaryText} />

                </TouchableOpacity>

              </View>


              <View style={styles.row}>

                <View style={styles.column}>

                  <TouchableOpacity onPress={() => setDisplayDelModal(true)}>
                    <Row style={{ marginVertical: 10 }}>
                      <Ionicons name='ios-calculator' size={30} color={Colours.deliveroo} />
                      <SmallText> Deliveroo</SmallText>
                    </Row>
                  </TouchableOpacity>

                  <TextInput
                    placeholder={'' + day.deliveroo}
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={deliverooInput}
                    contextMenuHidden={true}
                    value={delValue}
                    keyboardType='decimal-pad'
                  />

                  {/* moved the update statements to another file for cleaner code */}

                  <MyButton
                    text='Update'
                    colour={Colours.deliveroo}
                    textColour={Colours.black}
                    onPress={() => { setDelValue(updateDeliveroo(day, delValue)); refreshSummary(); }} />

                </View>

                <View style={styles.column}>

                  <Row style={{ minHeight: 33, marginVertical: 10 }}>
                    <SmallText>Uber</SmallText>
                  </Row>

                  <TextInput
                    placeholder={'' + day.uber}
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={uberInput}
                    contextMenuHidden={true}
                    value={uberValue}
                    keyboardType='decimal-pad' />

                  <MyButton
                    text='Update'
                    colour={Colours.uber}
                    textColour={Colours.black}
                    onPress={() => { setUberValue(updateUber(day, uberValue)); refreshSummary(); }} />
                </View>

                <View style={styles.column}>

                  <TouchableOpacity onPress={() => setDisplayHoursModal(true)}>
                    <Row style={{ marginVertical: 10 }}>
                      <Ionicons name='ios-calculator' size={30} color={Colours.hours} />
                      <SmallText> Hours</SmallText>
                    </Row>
                  </TouchableOpacity>

                  <TextInput
                    placeholder={'' + day.hours}
                    placeholderTextColor={Colours.placeholder}
                    style={myStyles.input}
                    onChangeText={hoursInput}
                    contextMenuHidden={true}
                    value={hoursValue}
                    keyboardType='decimal-pad'
                  />

                  <MyButton
                    text='Update'
                    colour={Colours.hours}
                    textColour={Colours.black}
                    onPress={() => { setHoursValue(updateHours(day, hoursValue)); refreshSummary(); }} />
                </View>



              </View>

            </ModalContainer>

            <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 20 : 15} />

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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginHorizontal: 5
  },
});

export default UpdateDays;