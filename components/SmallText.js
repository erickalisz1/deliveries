import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colours from '../assets/constants/darkTheme';

const SmallText = props => {

    const {between, top} = props;

    const styles = StyleSheet.create({
        text: {
            fontSize: 20,
            color: Colours.primaryText,
            textAlign: 'center',
            marginHorizontal: between ? between : 0,
            marginTop: top ? top : 0
        }
    });
    return (
        <Text style={{...styles.text, ...props.style}}>{props.children}</Text>
    );

};



export default SmallText;