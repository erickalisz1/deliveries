import React from 'react';
import { View } from 'react-native';
import { myStyles } from '../assets/helper/Styles';


const Column = props => {
    
    return (
        <View style={{...myStyles.verticalContainer, ...props.style}}>
                {props.children}
        </View>);
};



export default Column;