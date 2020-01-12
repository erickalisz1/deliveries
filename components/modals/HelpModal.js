import React from 'react';
import { Text, View, Modal } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { myStyles } from '../../assets/helper/Styles';

const HelpModal = (props) => {

    if (props.item) {
        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>


                <ModalSpace onClose={props.onClose} flex={props.item.flex} />

                <ModalContainer dark={false} detail>

                    <View style={myStyles.modalRow}>
                        <LargeText modal={true}>{props.item.display}</LargeText>
                    </View>

                    <View style={myStyles.modalRow}>
                        <Text style={myStyles.modalDescription}>{props.item.description}</Text>
                    </View>

                    <MyButton
                        text='Got it'
                        colour={Colours.success}
                        textColour={Colours.primaryText}
                        onPress={props.onClose}
                        style={myStyles.modalRow} />

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={props.item.flex} />
            </Modal>


        );
    }
    else return null;
};

export default HelpModal;