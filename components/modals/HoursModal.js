import React, { useState } from 'react';
import { View, TextInput, Modal, Alert } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';
import { myStyles } from '../../assets/helper/Styles';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';

const HoursModal = props => {

    const [enteredHours, setEnteredHours] = useState('');//empty string argument as default, function to change the text 
    const [enteredMinutes, setEnteredMinutes] = useState('');

    const hoursHandler = (enteredText) => {
        setEnteredHours(enteredText);
    };

    const minutesHandler = (enteredText) => {
        setEnteredMinutes(enteredText);
    };

    const setHours = () => {

        enteredMinutes === '' ? setEnteredMinutes(0) : '';

        if (enteredHours !== '') {//if the provided data is ok
            let hours = Number(enteredHours);
            let minutes = Number(enteredMinutes) / .6;

            minutes = minutes > 10 ? minutes.toPrecision(2) : minutes.toPrecision(1);

            props.setHours(hours, minutes);
            setEnteredHours('');
            setEnteredMinutes('');
        }
        else Alert.alert('Provide Data');

    };

    return (

        <Modal transparent={true} visible={props.visible} animationType='slide' >

            <DismissKeyboard>
                {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
                <View style={{ flex: 1 }} >
                    <ModalSpace onClose={props.onClose} flex={20} />

                    <ModalContainer detail smaller dark={true}>

                        <LargeText modal={true} >Hours Converter</LargeText>

                        <View style={myStyles.modalContainer}>
                            <View style={myStyles.modalColumn}>
                                <TextInput
                                    placeholder='Hours'
                                    placeholderTextColor={Colours.placeholder}
                                    style={myStyles.input}
                                    onChangeText={hoursHandler}
                                    value={enteredHours}
                                    keyboardType='decimal-pad' />

                                <MyButton
                                    text='Done'
                                    colour={Colours.success}
                                    textColour={Colours.primaryText}
                                    onPress={() => setHours()} />
                            </View>
                            <View style={myStyles.modalColumn}>
                                <TextInput
                                    placeholder='Minutes'
                                    placeholderTextColor={Colours.placeholder}
                                    style={myStyles.input}
                                    onChangeText={minutesHandler}
                                    value={enteredMinutes}
                                    keyboardType='decimal-pad' />

                                <MyButton
                                    text='Cancel'
                                    colour={Colours.cancel}
                                    textColour={Colours.white}
                                    onPress={props.onClose} />

                            </View>


                        </View>

                    </ModalContainer>

                    <ModalSpace onClose={props.onClose} flex={20} />
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

export default HoursModal;