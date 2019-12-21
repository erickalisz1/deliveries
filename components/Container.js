import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colours from '../constants/colours';

const Container = props => {
    return <View style={styles.container}>{props.children}</View>
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colours.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Container;