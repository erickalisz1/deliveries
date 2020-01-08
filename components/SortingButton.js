import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../assets/constants/darkTheme';

const SortingButton = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.background,
        borderColor: Colours.primaryText,
        borderWidth:1,
        marginHorizontal:5
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color:Colours.primaryText
    }

});


export default SortingButton;