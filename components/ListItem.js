import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { formatDate, SetPrecision } from '../assets/helper/helper';
// import Deliveries from '../Deliveries';
import Colours from '../assets/constants/darkTheme';

const ListItem = (props) => {

    const { columnToSort, selectedDay } = props;

    let ActualDay = selectedDay.actualDay;
    let Del = SetPrecision(selectedDay.deliveroo);
    let Uber = SetPrecision(selectedDay.uber);
    let Hours = SetPrecision(selectedDay.hours);
    let Total = SetPrecision(selectedDay.total);
    let Per = SetPrecision(selectedDay.per);

    let weekday = new Date(ActualDay).toDateString().substr(0, 3);// 'Mon'
    let day = formatDate(ActualDay);

    let fullDate = weekday + ', ' + day;// 'Mon, 23/09/2018'

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
        fontSize: 15,
        color: Colours.primaryText,
        textAlign: 'left'
    }
});

export default ListItem;