import React from 'react';
import { View } from 'react-native';
import { myStyles } from '../assets/helper/Styles';


const PickerWrapper = props => {
    
    return (
        <View style={{...myStyles.pickerWrapper, ...props.style}}>
                {props.children}
        </View>
        );
};



export default PickerWrapper;