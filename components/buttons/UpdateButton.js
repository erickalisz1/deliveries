import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../../constants/colours';

const UpdateButton = () => {
    return (
        <View style={styles.updateBtn}>
                    <Text style={styles.updateBtnText}>Update</Text>
                  </View>
    );
};

const styles = StyleSheet.create({
    updateBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.selected,
        minHeight: 30
      },
      updateBtnText: {
        fontSize: 20,
        color: Colours.background,
        textAlign: 'center',
      },

});

export default UpdateButton;

