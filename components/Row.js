import React from 'react';
import { View } from 'react-native';
import { myStyles } from '../assets/helper/Styles';


const Row = props => {
    
    return (
        <View style={myStyles.horizontalContainer}>
                {props.children}
        </View>);
};



export default Row;