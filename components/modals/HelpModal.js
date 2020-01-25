import React from 'react';
import { Text, View, Modal, Switch } from 'react-native';

import Colours from '../../assets/constants/Colours';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { myStyles } from '../../assets/helper/Styles';

const HelpModal = (props) => {

    const { item } = props;

    if (item) {

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>


                <ModalSpace onClose={props.onClose} flex={item.flex} />

                <ModalContainer dark={false}>

                    <View style={myStyles.modalRow}>
                        <LargeText modal={true}>{item.display}</LargeText>
                    </View>

                    <View style={myStyles.modalRow}>
                        <Text style={myStyles.modalDescription}>{item.description}</Text>
                    </View>

                    <MyButton
                        text='Got it'
                        colour={Colours.selected}
                        textColour={Colours.black}
                        onPress={props.onClose}
                        style={myStyles.modalRow} />

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={item.flex} />
            </Modal>


        );
    }
    else return null;
};

export default HelpModal;