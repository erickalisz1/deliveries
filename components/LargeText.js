import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colours from '../constants/colours';

const LargeText = props => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    );

};

const styles = StyleSheet.create({
    text: {
        fontSize: 36,
        color: Colours.primaryText,
        textAlign:'center'
    }
});

export default LargeText;