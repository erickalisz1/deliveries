import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { myStyles } from '../../assets/helper/Styles';

const HelpModal = (props) => {

    if(props.item){
        console.log(props.item.flex);
        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>
    
    
                <ModalSpace onClose={props.onClose} flex={props.item.flex} />
    
                <ModalContainer dark={false} >
    
                    <View style={myStyles.modalRow}>
                        <LargeText modal={true}>{props.item.display}</LargeText>
                    </View>
    
                    <View style={myStyles.modalRow}>
                        <Text style={myStyles.modalDescription}>{props.item.description}</Text>
                    </View>
    
    
                    <TouchableOpacity onPress={props.onClose} style={myStyles.modalRow}>
                    <MyButton text='Got it' colour={Colours.success} textColour={Colours.primaryText} />
                    </TouchableOpacity>
    
                </ModalContainer>
    
                <ModalSpace onClose={props.onClose} flex={props.item.flex} />
            </Modal>
    
    
        );
    }
    else return null;
};

export default HelpModal;