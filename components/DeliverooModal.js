import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import Colours from '../constants/colours';
import DismissKeyboard from './DismissKeyboard';
import Container from './Container';
import DoneButton from './buttons/DoneButton';
import CancelButton from './buttons/CancelButton';
import LargeText from './LargeText';
import { inputStyle } from '../helper/Styles';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';

const DeliverooModal = props => {

    const [enteredFees, setEnteredFees] = useState('');//empty string argument as default, function to change the text 
    const [enteredExtras, setEnteredExtras] = useState('');

    const feesHandler = (enteredText) => {
        setEnteredFees(enteredText);
    };

    const extrasHandler = (enteredText) => {
        setEnteredExtras(enteredText);
    };

    const setDel = () => {

        enteredExtras === '' ? setEnteredExtras(0) : '';

        if (enteredFees !== '') {//if the provided data is ok

            //the whole point of this calculator is to set this value
            let fees = Number(enteredFees) * .95;
            let extras = Number(enteredExtras);
            let total = Number(fees + extras);

            total = total > 100 ? total.toPrecision(5) : total.toPrecision(4);

            props.setDel(total);

            setEnteredFees('');
            setEnteredExtras('');
        }
        else Alert.alert('Provide Data');

    };

    return (

        <Modal transparent={true} visible={props.visible} animationType='slide' >

            <DismissKeyboard>
                {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
                <View style={{ flex: 1 }} >

                    <ModalSpace onClose={props.onClose} flex={12} />

                    <ModalContainer smaller={true} dark={true}>

                        <LargeText modal={true} >Deliveroo Calculator</LargeText>

                        <View style={styles.horizontalContainer}>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Order Fees'
                                    placeholderTextColor={Colours.placeholder}
                                    style={inputStyle.input}
                                    onChangeText={feesHandler}
                                    value={enteredFees}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={() => { setDel() }}>
                                    <DoneButton />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.column}>
                                <TextInput
                                    placeholder='Tips or extras'
                                    placeholderTextColor={Colours.placeholder}
                                    style={inputStyle.input}
                                    onChangeText={extrasHandler}
                                    value={enteredExtras}
                                    keyboardType='decimal-pad' />

                                <TouchableOpacity onPress={props.onClose}>
                                    <CancelButton />
                                </TouchableOpacity>
                            </View>


                        </View>

                    </ModalContainer>

                    <ModalSpace onClose={props.onClose} flex={12} />

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
        flex: 1
    },
});

export default DeliverooModal;