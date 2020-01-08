import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colours from '../assets/constants/darkTheme';
import LargeText from '../components/LargeText';

const Card = (props) => {

    const { title, average, max } = props;

    return (
        <View style={styles.cardWrapper}>

            <View style={styles.contentRow}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.contentRow}>
                <Text style={styles.title}>AVG: ${average} MAX:{max}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        margin: 10,
        padding: 10,
        borderColor: Colours.primaryText,
        borderBottomWidth: 3,
        minWidth: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colours.backgroundLight,
        borderRadius:15
    },
    contentRow: {

    },
    title: {
        color: Colours.primaryText,
        fontSize: 20
    }
});

export default Card;