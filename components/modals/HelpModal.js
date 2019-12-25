import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';

const HelpModal = (props) => {

    if(props.item){
        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>
    
    
                <ModalSpace onClose={props.onClose} flex={props.item.flex} />
    
                <ModalContainer dark={false} >
    
                    <View style={styles.row}>
                        <LargeText modal={true}>{props.item.display}</LargeText>
                    </View>
    
                    <View style={styles.row}>
                        <Text style={styles.description}>{props.item.description}</Text>
                    </View>
    
    
                    <TouchableOpacity onPress={props.onClose} style={styles.row}>
                    <MyButton text='Got it' colour={Colours.success} textColour={Colours.primaryText} />
                    </TouchableOpacity>
    
                </ModalContainer>
    
                <ModalSpace onClose={props.onClose} flex={props.item.flex} />
            </Modal>
    
    
        );
    }
    else return null;
};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal:25,
        margin:0
    },
    description:{
        color:Colours.primaryText,
        fontSize:16,
        textAlign:'center'
    }
});

export default HelpModal;