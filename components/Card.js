import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Colours  from '../assets/constants/Colours';
import SmallText from './SmallText';

const Card = (props) => {

    const { title, average, max, min, averageWeeks, maxWeeks, minWeeks, colour, type } = props;

    const availableDeviceHeight = Dimensions.get('window').height;

    let beforeText = '', afterText = '';//need these variables because values displayed can be dollars, hours or dollars per hour


    if (type === 'number') {
        beforeText = '$'
    }
    else if (type === 'hours') {
        afterText = 'h'
    }
    else if (type === 'per') {
        beforeText = '$';
        afterText = '/h';
    }

    const styles = StyleSheet.create({
        cardWrapper: {
            margin: 5,
            borderColor: colour,
            borderWidth: 2,
            minWidth: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colours.backgroundLight,
            borderRadius: 15,
            padding:10
        },
        contentColumn: {
            flex: 5
        },
        contentColumnWeeks:{
            flex: 3
        },
        title: {
            flex: 5
        },
        content: {
            textAlign: 'left',
            fontSize: availableDeviceHeight > 700 ? 18 : 15,
            color: Colours.primaryText,
            marginVertical: 2,
        },
    });

    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={props.onPress}>

            <View style={styles.title}>
                <SmallText style={{ color: colour }} >{title}</SmallText>
            </View>
            <View style={styles.contentColumn}>
                <Text style={styles.content}>Min: {beforeText}{min}{afterText}</Text>
                <Text style={styles.content}>Avg: {beforeText}{average}{afterText}</Text>
                <Text style={styles.content}>Max: {beforeText}{max}{afterText}</Text>
            </View>
            <View style={styles.contentColumnWeeks}>
                <Text style={styles.content}>{beforeText}{minWeeks}{afterText}</Text>
                <Text style={styles.content}>{beforeText}{averageWeeks}{afterText}</Text>
                <Text style={styles.content}>{beforeText}{maxWeeks}{afterText}</Text>
            </View>

        </TouchableOpacity>
    );
};



export default Card;