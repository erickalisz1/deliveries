import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colours from '../assets/constants/Colours';

const SortingButton = (props) => {

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            borderRadius: 15,
            backgroundColor: props.light ? Colours.backgroundLight : Colours.background,
            borderColor: props.colour,
            borderWidth: 1,
            marginHorizontal: 5
        },
        text: {
            fontSize: 20,
            textAlign: 'center',
            color: props.colour
        }

    });

    return (

        <TouchableOpacity style={{ ...styles.container, ...props.style }} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>

    );
};


export default SortingButton;