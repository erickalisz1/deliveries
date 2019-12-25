import React from 'react';
import { StyleSheet } from 'react-native';
import Colours from '../constants/darkTheme';

export const inputStyle = StyleSheet.create({
    input:{
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        marginHorizontal: 5,
        padding: 5,
        textAlign: "center",
        fontSize: 17,
        color: Colours.primaryText,
    }
  });