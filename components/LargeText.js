import React from 'react';
import { StyleSheet, Text, Platform } from 'react-native';
import Colours from '../assets/constants/colours';

const LargeText = props => {

    const styles = StyleSheet.create({
        text: {
            fontSize: props.modal === true ? 24 : 36,
            margin: props.modal === true ? 20 : 0,
            color: Colours.primaryText,
            textAlign: 'center',
            marginTop: props.moreMargin === true ? (Platform.OS === 'ios' ? 15 : 45) : 0 
        }
    });
    return (
        <Text style={styles.text}>{props.children}</Text>
    );

};



export default LargeText;