import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colours from '../constants/colours';

const Container = props => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: props.modal === true ? 50 : 0,
            borderWidth: props.modal === true ? 1 : 0,
            borderColor: props.modal === true ? Colours.primaryText : 'rgba(0,0,0,0)',
            marginHorizontal: props.smaller === true ? 40 : 0
        }
    });

    return (
        <SafeAreaView style={styles.container}>
                {props.children}
        </SafeAreaView>);
};



export default Container;