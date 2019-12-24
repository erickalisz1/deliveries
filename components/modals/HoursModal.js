import React, { useState } from 'react';
import { View, TextInput, Platform, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';

import Colours from '../../assets/constants/colours';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';
import { inputStyle } from '../../assets/helper/Styles';
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

            console.log(hours, minutes);

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
                    <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 13 : 18} />

                    <ModalContainer smaller={true} dark={true}>

                        <LargeText modal={true} >Hours Converter</LargeText>

                        <View style={styles.horizontalContainer}>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Hours'
                                    placeholderTextColor={Colours.placeholder}
                                    style={inputStyle.input}
                                    onChangeText={hoursHandler}
                                    value={enteredHours}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={() => { setHours() }}>
                                    <MyButton text='Done' colour={Colours.success} textColour={Colours.primaryText} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Minutes'
                                    placeholderTextColor={Colours.placeholder}
                                    style={inputStyle.input}
                                    onChangeText={minutesHandler}
                                    value={enteredMinutes}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={props.onClose}>
                                    <MyButton text='Cancel' colour={Colours.cancel} textColour={Colours.primaryText} />
                                </TouchableOpacity>
                            </View>


                        </View>

                    </ModalContainer>

                    <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 13 : 18} />
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

const styles = StyleSheet.create({
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '93%',
        marginTop: 15,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginHorizontal:20
    },
});

export default HoursModal;