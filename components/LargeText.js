import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colours from '../constants/colours';

const LargeText = props => {

    const styles = StyleSheet.create({
        text: {
            fontSize: props.modal === true ? 24 : 36,
            margin: props.modal === true ? 20 : 0,
            color: Colours.primaryText,
            textAlign: 'center'
        }
    });

    return (
        <Text style={styles.text}>{props.children}</Text>
    );

};



export default LargeText;