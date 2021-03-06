import React, { useState } from 'react';
import { View, TextInput, Modal, Alert } from 'react-native';

import { myStyles } from '../../assets/helper/Styles';
import Colours from '../../assets/constants/Colours';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';

const DeliverooModal = props => {

    //two textInputs
    const [enteredFees, setEnteredFees] = useState('');//empty string argument as default, function to change the text 
    const [enteredExtras, setEnteredExtras] = useState('');

    const feesHandler = (enteredText) => {
        setEnteredFees(enteredText);
    };

    const extrasHandler = (enteredText) => {
        setEnteredExtras(enteredText);
    };

    const setDel = () => {

        const feeRate = .96;//they changed the fee this december

        enteredExtras === '' ? setEnteredExtras(0) : '';
        enteredFees === '' ? setEnteredFees(0) : '';

        //the whole point of this calculator is to set this value
        let fees = Number(enteredFees) * feeRate;
        let extras = Number(enteredExtras);
        let total = Number(fees + extras);

        total = total > 100 ? total.toPrecision(5) : total.toPrecision(4);

        enteredFees >= 0 && enteredExtras >= 0 ?
        props.setDel(total)
        :
        Alert.alert('Provide Accurate Data');

        setEnteredFees('');
        setEnteredExtras('');

    };

    return (

        <Modal transparent={true} visible={props.visible} animationType='slide' >

            <DismissKeyboard>
                {/* needed to wrap this whole thing into another view so my keyboard dismiss worked */}
                <View style={{ flex: 1 }} >

                    <ModalSpace onClose={props.onClose} flex={20} />

                    <ModalContainer marginHorizontal={40} minHeight={170} dark={true}>

                        <LargeText modal={true} >Deliveroo Calculator</LargeText>

                        <View style={myStyles.modalContainer}>
                            <View style={myStyles.modalColumn}>
                                <TextInput
                                    placeholder='Fees'
                                    placeholderTextColor={Colours.placeholder}
                                    style={myStyles.input}
                                    onChangeText={feesHandler}
                                    value={enteredFees}
                                    keyboardType='decimal-pad' />

                                <MyButton
                                    text='Cancel'
                                    colour={Colours.cancel}
                                    textColour={Colours.white}
                                    onPress={props.onClose} />

                            </View>
                            <View style={myStyles.modalColumn}>
                                <TextInput
                                    placeholder='Tips'
                                    placeholderTextColor={Colours.placeholder}
                                    style={myStyles.input}
                                    onChangeText={extrasHandler}
                                    value={enteredExtras}
                                    keyboardType='decimal-pad' />

                                <MyButton
                                    text='Done'
                                    colour={Colours.success}
                                    textColour={Colours.primaryText}
                                    onPress={() => setDel()} />
                            </View>


                        </View>

                    </ModalContainer>

                    <ModalSpace onClose={props.onClose} flex={20} />

                </View>
            </DismissKeyboard>
        </Modal>
    );
};


export default DeliverooModal;