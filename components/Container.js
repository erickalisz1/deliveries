import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colours from '../assets/constants/colours';

const Container = props => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center'            
        }
    });

    return (
        <SafeAreaView style={styles.container}>
                {props.children}
        </SafeAreaView>);
};



export default Container;