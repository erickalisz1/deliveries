import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import Colours from '../assets/constants/Colours';

const LargeText = props => {

    const styles = StyleSheet.create({
        text: {
            fontSize: props.modal === true ? 24 : 36,
            margin: props.modal === true ? 20 : 0,
            color: props.colour ? props.colour : Colours.primaryText,
            textAlign: 'center',
            marginTop: props.moreMargin === true ? (Platform.OS === 'ios' ? 15 : 45) : 0 
        }
    });
    return (
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text> 
    );

};



export default LargeText;