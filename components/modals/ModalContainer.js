import React from 'react';
import { View, StyleSheet } from 'react-native';
import Colours from '../../assets/constants/Colours';

const ModalContainer = props => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            backgroundColor: props.dark === true ? Colours.background : Colours.backgroundLight,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius:50,
            borderWidth:  2,
            borderColor: props.colour ? props.colour : Colours.primaryText,
            marginHorizontal: props.marginHorizontal ? props.marginHorizontal : 20,
            minHeight: props.minHeight ? props.minHeight : 210,
        }
    });

    return (
        <View style={{...styles.container, ...props.style}}>
                {props.children}
        </View>);
};



export default ModalContainer;