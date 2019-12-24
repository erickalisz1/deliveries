import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colours from '../constants/colours';

const ModalContainer = props => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:50,
            borderWidth:  2,
            borderColor: Colours.primaryText,
            marginHorizontal: props.smaller === true ? 35 : 20,
            minHeight: Platform.OS === 'android' ? 150 : 0,
        }
    });

    return (
        <View style={styles.container}>
                {props.children}
        </View>);
};



export default ModalContainer;