import React from 'react';
import { View, TouchableWithoutFeedback, Platform } from 'react-native';

const ModalSpace = props => {

    let { flex } = props;
    
    return (
        /* this makes so that pressing outside the modal closes it */
        < TouchableWithoutFeedback onPress={props.onClose} >
            <View style={{ flex: flex }}></View>
        </TouchableWithoutFeedback >);
};

export default ModalSpace;
