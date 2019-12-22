import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../../constants/colours';

const DoneButton = () => {
    return (
        <View style={styles.done}>
            <Text style={styles.doneText}>Done</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    done: {
        marginVertical: 25,
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