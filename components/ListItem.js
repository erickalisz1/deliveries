import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate } from '../helper/helper';
// import Deliveries from '../Deliveries';
import Colours from '../constants/colours';

const ListItem = (props) => {

    const { columnToSort } = props;

    let ActualDay = props.date;
    //transforming the objects into strings and then numbers
    let Del = Number(JSON.stringify(props.del));
    let Uber = Number(JSON.stringify(props.ub));
    let Hours = Number(JSON.stringify(props.hours));
    let Total = Del + Uber;
    let Per = 0;
    if (Hours > 0) {
        Per = Total / Hours;
    }

    //creating deliveries object
    // let delivery = new Deliveries(props.id, , , , );

    // console.log(Hours);

    let weekday = new Date(ActualDay).toDateString().substr(0, 3);//weekday

    //new Date(Object.values(date.actualDay)).toDateString().substr(0, 3);//weekday

    let day = formatDate(ActualDay);//formatDate(date.actualDay);

    let fullDate = weekday + ', ' + day;

    Per = Per.toPrecision(4);

    //setting appropriate precision
    Total = Total >= 100 ? Total.toPrecision(5) : Total.toPrecision(4);
    Del = Del >= 100 ? Del.toPrecision(5) : Del.toPrecision(4);
    Uber = Uber >= 100 ? Uber.toPrecision(5) : Uber.toPrecision(4);

    if (columnToSort === 'dayNumber') {//default sorting
        if (Hours === 0 && Total < 1) {//not worked
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {fullDate} - N/W </Text>
                </View>
            );
        }

        else if (Hours === 0 && Total > 0) {//worked but don't know the hours
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - ${Total} </Text>
                </View>
            );
        }

        else return (
            <View style={styles.item}>
                <Text style={styles.value}> {day} - ${Total} - {Hours}h - ${Per}/h</Text>
            </View>
        );
    }

    else if (columnToSort === 'deliveroo') {//sorting by deliveroo
        if (Hours > 0 && Del > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Deliveroo: ${Del} - ${Per}/h</Text>
                </View>
            );
        }
        else if (Hours < 1 && Del > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Deliveroo: ${Del}</Text>
                </View>
            );
        }
        else return null;
    }

    else if (columnToSort === 'uber') {//sorting by uber
        if (Hours > 0 && Uber > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Uber: ${Uber} - ${Per}/h</Text>
                </View>
            );
        }
        else if (Hours < 1 && Uber > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Uber: ${Uber}</Text>
                </View>
            );
        }
        else return null;
    }
    else if (columnToSort === 'total') {//sorting by total
        if (Hours > 0 && Total > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Total: ${Total} - ${Per}/h</Text>
                </View>
            );
        }
        else if (Hours < 1 && Total > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Total: ${Total}</Text>
                </View>
            );
        }
        else return null;
    }
    else if (columnToSort === 'per') {//sorting by per
        if (Hours > 0 && Per > 0) {
            return (
                <View style={styles.item}>
                    <Text style={styles.value}> {day} - Total: ${Total} - ${Per}/h</Text>
                </View>
            );
        }
        else return null;
    }

    else return <View><Text>something went wrong</Text></View>
}

const styles = StyleSheet.create({
    item: {
        marginVertical: 1,
        minWidth: '95%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colours.accent,
    },
    value: {
        fontSize: 16,
        color: Colours.primaryText,
        textAlign: 'left'
    }
});

export default ListItem;