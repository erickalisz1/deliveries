import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import Colours from '../constants/colours';
import Deliveries from '../Deliveries';
import { formatDate, nextDay } from '../helper/helper';
import Loading from '../components/Loading';
import Container from '../components/Container';
import LargeText from '../components/LargeText';

const AddDays = () => {

    const [lastDayOnDB, setLastDayOnDB] = useState(null);
    const [date, setDate] = useState();

    const getLastDayOnDB = () => {

        let query = firebase.database().ref('deliveries/').orderByKey().limitToLast(1);

        query.once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                const delivery = new Deliveries();

                let id = childSnapshot.key;

                delivery.dayNumber = Number(id);
                delivery.actualDay = childSnapshot.val().actualDay;
                delivery.deliveroo = childSnapshot.val().deliveroo;
                delivery.uber = childSnapshot.val().uber;
                delivery.hours = childSnapshot.val().hours;
                delivery.total = delivery.deliveroo + delivery.uber;

                delivery.hours > 0 ? (delivery.per = delivery.total / delivery.hours) : (delivery.per = 0);

                setLastDayOnDB(delivery);
                setDate(new Date(delivery.actualDay));

            });
        });
    };

    const addDay = (actualDay) => {

        firebase.database().ref('deliveries/' + (lastDayOnDB.dayNumber + 1)).set(
            {
                actualDay: actualDay,
                deliveroo: 0,
                hours: 0,
                uber: 0
            }
        ).then(() => {
            console.log('Added', formatDate(actualDay));
            Alert.alert('Added ' + formatDate(actualDay),'Date was successfully added');
            setLastDayOnDB(null);//reseting state so that data is refreshed

        }).catch((error) => {
            console.log(error);
            Alert.alert('Error', error);
        });
    };

    //checking if data has been loadded
    lastDayOnDB === null ? getLastDayOnDB() : '';

    return (
        <Container dark={true}>

            {/* conditional rendering */}
            {lastDayOnDB === null ? (<Loading />)
                :
                (
                    <View>
                        <LargeText>Last Day on Database:</LargeText>
                        <LargeText>{new Date(lastDayOnDB.actualDay).toDateString()}</LargeText>
                        <TouchableOpacity style={styles.addBtn} onPress={() => addDay(nextDay(date))}>
                            <View>
                                <Text style={styles.addBtnText}>Add {new Date(nextDay(date)).toDateString()} </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}


        </Container>
    );

};

const styles = StyleSheet.create({
    addBtn: {
        margin: 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.selected,
        minHeight: 30
    },
    addBtnText: {
        fontSize: 20,
        color: Colours.background,
        textAlign: 'center',
    },
});

export default AddDays;