import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colours from '../constants/colours';

const AppHelp = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>App Help Screen</Text>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 36,
        color:Colours.primaryText       
    }
});

export default AppHelp;