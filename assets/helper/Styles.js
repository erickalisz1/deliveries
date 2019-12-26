import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import Colours from '../constants/darkTheme';

export const myStyles = StyleSheet.create({
    input:{
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        padding: 5,
        textAlign: "center",
        fontSize: 17,
        color: Colours.primaryText,
    },
    sortLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 15 : 35,
        marginBottom: 15,
        color: Colours.primaryText
    }
  });