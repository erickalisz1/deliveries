import React from 'react';
import { View, TouchableWithoutFeedback, Platform, Dimensions } from 'react-native';

const ModalSpace = props => {

    let { flex } = props;

    console.log('flex before:', flex);

    const availableDeviceHeight = Dimensions.get('window').height;

    availableDeviceHeight < 700 ?
        (Platform.OS === 'ios' ? flex -= 4 : flex -= 2) //small ios : android
        :
        (''); //large ios : android its ok, do nothing


    flex = flex === 10 ? 8 : flex;//if for some reason its taking all space, set it to be smaller

    flex = flex <= 0 ? 3 : flex;//if for some reason its taking no space, set it to be larger

    console.log('flex after:', flex);

    return (
        /* this makes so that pressing outside the modal closes it */
        < TouchableWithoutFeedback onPress={props.onClose} >
            <View style={{ flex: flex }}></View>
        </TouchableWithoutFeedback >);
};

export default ModalSpace;
