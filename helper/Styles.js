import React from 'react';
import { StyleSheet } from 'react-native';
import Colours from '../constants/colours';

export const inputStyle = StyleSheet.create({
    input:{
        flex:1,
        borderBottomColor: Colours.selected,
        borderBottomWidth: 1,
        marginHorizontal: 8,
        padding: 5,
        textAlign: "center",
        fontSize: 20,
        color: Colours.primaryText,
        minHeight: 35
    }
  });