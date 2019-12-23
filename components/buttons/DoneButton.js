import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../../constants/colours';

const DoneButton = (props) => {

    let text;
    props.text ? (text = props.text) : (text = 'Done')
    

    return (
        <View style={styles.done}>
            <Text style={styles.doneText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    done: {
        marginTop: 25,
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.success,
        marginHorizontal:30,
    },
    doneText: {
        fontSize: 20,
        color: Colours.primaryText,
        textAlign: 'center',
    }

});

export default DoneButton;