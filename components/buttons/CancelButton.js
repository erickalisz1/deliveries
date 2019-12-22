import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../../constants/colours';

const CancelButton = props => {
    return (
        <View style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cancel: {
        marginVertical: 25,
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.cancel,
        marginHorizontal:30,
    },
    cancelText: {
        fontSize: 20,
        color: Colours.primaryText,
        textAlign: 'center',
    }

});

export default CancelButton;