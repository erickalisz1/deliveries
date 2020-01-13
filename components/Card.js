import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Colours from '../assets/constants/darkTheme';
import SmallText from './SmallText';

const Card = (props) => {

    const { title, average, max, min, colour, type } = props;

    const availableDeviceHeight = Dimensions.get('window').height;

    let beforeText = '', afterText = '';

    if(type === 'number'){
        beforeText = '$'
    }
    else if(type === 'hours'){
        afterText = 'h'
    }
    else if(type === 'per'){
        beforeText = '$';
        afterText = '/h';
    }

    const styles = StyleSheet.create({
        cardWrapper: {
            margin: 5,
            borderColor: colour,
            borderWidth: 2,
            minWidth: '80%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colours.backgroundLight,
            borderRadius: 15,
        },
        contentColumn: {
            marginVertical: 10,
            flex: 3
        },
        title: {
            flex: 2
        },
        content: {
            textAlign: 'left',
            fontSize: availableDeviceHeight > 700 ? 18 : 15,
            color: Colours.primaryText,
            marginVertical:2
        }
    });

    return (
        <View style={styles.cardWrapper}>

            <View style={styles.title}>
                <SmallText style={{ color: colour }} >{title}</SmallText>
            </View>
            <View style={styles.contentColumn}>
                <Text style={styles.content}>Min: {beforeText}{min}{afterText}</Text>
                <Text style={styles.content}>Avg: {beforeText}{average}{afterText}</Text>
                <Text style={styles.content}>Max: {beforeText}{max}{afterText}</Text>
            </View>

        </View>
    );
};



export default Card;