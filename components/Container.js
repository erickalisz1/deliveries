import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Colours from '../constants/colours';

const Container = props => {

    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: props.rounded === true ? 50 : 0
        }
    });

    return <SafeAreaView style={styles.container}>{props.children}</SafeAreaView>
};



export default Container;