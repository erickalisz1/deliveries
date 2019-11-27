import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  formatDate  from '../helper/helper';


const ListItem = props => {


    let weekday = new Date(props.date).toDateString().substr(0, 3);//weekday

    let date = formatDate(props.date);

    let fullDate = weekday + ', ' + date;

    let total = props.deliveroo + props.uber;
    const per = total / props.hours;

    // total = total.toPrecision(1) ;

    // total = total >= 100 ? total.toPrecision(5) : total.toPrecision(4);

    if (props.hours === 0 && total < 1) {
        return (
            <View style={styles.item}>
                <Text style={styles.value}> {fullDate} - N/W </Text>
            </View>
        );
    }

    else if (props.hours === 0) {
        return (
            <View style={styles.item}>
                <Text style={styles.value}> {date} - ${total} </Text>
            </View>
        );
    }

    else return (
        <View style={styles.item}>
            <Text style={styles.value}> {date} - ${total} - {props.hours}h - ${per.toPrecision(4)}/h </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 1,
        minWidth: '95%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'

    },
    value: {
        fontSize: 16,
    }
});

export default ListItem;