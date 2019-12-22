import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colours from '../constants/colours';

const ModalContainer = props => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:50,
            borderWidth:  1,
            borderColor: Colours.primaryText,
            marginHorizontal: props.smaller === true ? 35 : 20            
        }
    });

    return (
        <SafeAreaView style={styles.container}>
                {props.children}
        </SafeAreaView>);
};



export default ModalContainer;