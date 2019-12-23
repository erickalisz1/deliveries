import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colours from '../constants/colours';

const HelpItem = (props) => {



    return (
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.value}>{props.title}</Text>
            </View>
            <View style={styles.column}>
                <Ionicons name='ios-arrow-forward' size={25} color={Colours.selected} />
            </View>
        </View>
    );


}

const styles = StyleSheet.create({
    row: {
        marginVertical: 3,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colours.backgroundLight,
        minWidth:'95%',
        justifyContent:'space-between'
    },
    column: {
        marginHorizontal:10
    },
    value: {
        fontSize: 20,
        color: Colours.primaryText,
    }
});

export default HelpItem;