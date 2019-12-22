import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert, TouchableOpacity } from 'react-native';

import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import Container from './Container';
import DoneButton from './buttons/DoneButton';
import CancelButton from './buttons/CancelButton';
import LargeText from './LargeText';
import { inputStyle } from '../helper/Styles';

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

        if (enteredHours !== '' && enteredMinutes !== '') {//if the provided data is ok
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
                    <View style={{ flex: 12 }} ></View>

                    <Container modal={true} smaller={true} dark={true}>

                        <LargeText modal={true} >Hours Converter</LargeText>

                        <View style={styles.horizontalContainer}>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Hours'
                                    placeholderTextColor={Colours.accent}
                                    style={inputStyle.input}
                                    onChangeText={hoursHandler}
                                    value={enteredHours}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={() => { setHours() }}>
                                    <DoneButton />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Minutes'
                                    placeholderTextColor={Colours.accent}
                                    style={inputStyle.input}
                                    onChangeText={minutesHandler}
                                    value={enteredMinutes}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={props.onClose}>
                                    <CancelButton />
                                </TouchableOpacity>
                            </View>


                        </View>

                    </Container>

                    <View style={{ flex: 12 }} ></View>
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

const styles = StyleSheet.create({
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '95%',
        marginTop: 15,
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex:1
    },
});

export default HoursModal;