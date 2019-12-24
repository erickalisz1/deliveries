import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const ModalSpace = props => {

    return (
        /* this makes so that pressing outside the modal closes it */
        < TouchableWithoutFeedback onPress={props.onClose} >
            <View style={{ flex: props.flex }}></View>
        </TouchableWithoutFeedback >);
};

export default ModalSpace;
