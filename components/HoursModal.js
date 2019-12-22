import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';

import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import Container from './Container';

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

        if (enteredHours !== '' && enteredMinutes !== '') 
        {//if the provided data is ok
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
            
            <View style={{ flex: 1 }} ></View>
            <DismissKeyboard>

                <Container rounded={true} dark={true}>

                    <Text style={styles.title}>Hours Converter</Text>

                    <TextInput
                        placeholder="Hours"
                        placeholderTextColor={Colours.accent}
                        style={styles.input}
                        onChangeText={hoursHandler}
                        value={enteredHours}
                        keyboardType='decimal-pad' />
                    <TextInput
                        placeholder="Minutes"
                        placeholderTextColor={Colours.accent}
                        style={styles.input}
                        onChangeText={minutesHandler}
                        value={enteredMinutes}
                        keyboardType='decimal-pad' />

                    <Button title="Ok" onPress={() => { setHours() }} />
                </Container>
            </DismissKeyboard>
            <View style={{ flex: 1 }} ></View>
            
        </Modal>
    );
};

const styles = StyleSheet.create({
    title: {
        color: Colours.primaryText,
        fontSize: 24,
        margin: 20
    },
    input: {
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        textAlign: "center",
        fontSize: 20,
        color: Colours.primaryText,
        margin:10
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%',
    },
    button: {
        width: '40%'
    },
});

export default HoursModal;