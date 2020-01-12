import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Container from '../components/Container';
import Colours from '../assets/constants/darkTheme';
import Card from '../components/Card';
import firebase from 'firebase';
import Loading from '../components/Loading';
import Deliveries from '../assets/models/Deliveries';
import { SetPrecision, filters } from '../assets/helper/helper';
import LargeText from '../components/LargeText';
import { DAYS } from '../assets/constants/strings';

const Dashboard = () => {
    //list.map value.title, average, max

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [cardsList, setCardsList] = useState([]);



    const renderList = () => {

        let localList = [];

        let start = new Date();
        let daysCount = 0;
        let week = 0;

        console.log('Fetching List...');

        let query = firebase.database().ref('deliveries/').orderByKey();

        // SELECT * STATEMENT
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

                delivery.week = week;
                delivery.dayOfWeek = new Date(delivery.actualDay).getDay();

                localList.push(delivery);

                //logic to define weeks based on days
                daysCount += 1;
                if (daysCount === 7) {
                    daysCount = 0;
                    week += 1;
                }
            });

            //finished building list
            let finish = new Date();
            console.log((finish - start) + 'ms to fetch list on', Platform.OS);

        }).then(() => { listLoaded(localList) });
    };

    let listOfCards = [];
    //the columns I want to display
    let columns = filters.filter(item => item.key !== DAYS );

    const listLoaded = (loadedList) => {

        setIsLoading(false);
        setDeliveriesList(loadedList);

        //creating list
        columns.forEach(column => {
            let cardList = loadedList.filter(item => item[column.value] > 0);

            

            let min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY, temp;

            for (let i = cardList.length - 1; i >= 0; i--) {
                temp = cardList[i][column.value];
                if (temp < min) min = temp;
                if (temp > max) max = temp;
            }
            let avg = (SetPrecision(cardList.reduce((total, next) => total + next[column.value], 0) / cardList.length));

            listOfCards.push({ column: column.key, avg: avg, min: min, max: max, key: column.value, colour:column.colour, type: column.type });
        });

        let Cards = listOfCards.map(row => {
            return <Card title={row.column} average={row.avg} min={row.min} max={SetPrecision(row.max)} key={row.key} colour={row.colour} type={row.type}/>
        });

        setCardsList(Cards);

        
    }


    isLoading ? renderList() : null;

    return (

        <Container dark={true}>

            {isLoading ? <Loading /> : (
                <View>
                    <LargeText>Summary</LargeText>
                    {cardsList}
                </View>
            )}

        </Container>
    );
};

const styles = StyleSheet.create({

});

export default Dashboard;