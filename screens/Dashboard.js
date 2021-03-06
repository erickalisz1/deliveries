import React, { useState } from 'react';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';

import Container from '../components/Container';
import Card from '../components/Card';
import LargeText from '../components/LargeText';
import { SetPrecision, filters, fireRef, deliveriesRef } from '../assets/helper/helper';
import { DAYS } from '../assets/constants/strings';
import Deliveries from '../assets/models/Deliveries';
import { ACTIONS } from '../store/actions/actions';
import { Alert } from 'react-native';
import CardDetail from '../components/modals/CardDetail';



const Dashboard = () => {

    const appOffline = useSelector(state => state.user.appOffline);

    // if the app is offline, the firebase list hasn't been set
    const list = useSelector(state => state.user.userDaysList);
    const weeksList = useSelector(state => state.user.userWeeksList);
    const name = useSelector(state => state.user.username);

    const dispatch = useDispatch();

    let refresh = false;

    if (!appOffline) {
        refresh = useSelector(state => state.user.shouldRefresh);
    }
    else {
        dispatch({
            type: ACTIONS.SET_SQL_LIST,
            value: []
        });
    }

    const [refreshedList, setRefreshedList] = useState(list);
    const [selectedItem, setSelectedItem] = useState(null);
    const [displayVisible, setDisplayVisible] = useState(false);

    const refreshList = (userID, userName) => {

        let localList = [];

        let start = new Date();
        let daysCount = 0;
        let week = 0;

        console.log('Refreshing Days List for', userName);

        // SELECT * STATEMENT
        firebase.
            database().
            ref(fireRef + userID + deliveriesRef).
            orderByKey().
            once('value').
            then(snapshot => {
                snapshot.forEach(day => {

                    const delivery = new Deliveries();

                    let id = day.key;

                    delivery.dayNumber = Number(id);
                    delivery.actualDay = day.val().actualDay;
                    delivery.deliveroo = day.val().deliveroo;
                    delivery.uber = day.val().uber;
                    delivery.hours = day.val().hours;
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
                console.log((finish - start) + 'ms to fetch list for', name);

            }).then(() => { setRefreshedList(localList); dispatch({ type: ACTIONS.SHOULD_REFRESH_SUMMARY, value: false }) });
    };

    refresh ? refreshList(firebase.auth().currentUser.uid, name) : null;

    let Cards;
    //the columns I want to display
    let columns = filters.filter(item => item.key !== DAYS);

    const displayCards = (list, weeksList) => {

        //creating list
        let listOfCards = [];
        columns.forEach(column => {
            //days
            let cardList = list.filter(item => item[column.value] > 0);
            //weeks
            let weeksCardList = weeksList.filter(item => item[column.value] > 0);

            let min = Number.POSITIVE_INFINITY, max = Number.NEGATIVE_INFINITY, temp;
            let weeksMin = Number.POSITIVE_INFINITY, weeksMax = Number.NEGATIVE_INFINITY, weeksTemp;

            for (let i = cardList.length - 1; i >= 0; i--) {
                temp = cardList[i][column.value];
                if (temp < min) min = temp;
                if (temp > max) max = temp;
            }
            let avg = cardList.reduce((total, next) => total + next[column.value], 0) / cardList.length;

            for (let i = weeksCardList.length - 1; i >= 0; i--) {
                weeksTemp = weeksCardList[i][column.value];
                if (weeksTemp < weeksMin) weeksMin = weeksTemp;
                if (weeksTemp > weeksMax) weeksMax = weeksTemp;
            }
            let weekAvg = weeksCardList.reduce((total, next) => total + next[column.value], 0) / weeksCardList.length;

            listOfCards.push({
                column: column.key,
                avg: avg > 0 && avg < 100000 ? avg : 0,
                min: min > 0 && min < 100000 ? min : 0,
                max: max > 0 && max < 100000 ? max : 0,

                weekAvg: weekAvg > 0 && weekAvg < 100000 ? weekAvg : 0,
                weeksMin: weeksMin > 0 && weeksMin < 100000 ? weeksMin : 0,
                weeksMax: weeksMax > 0 && weeksMax < 100000 ? weeksMax : 0,

                key: column.value,
                colour: column.colour,
                type: column.type
            });
        });

        Cards = listOfCards.map(row => {
            return <Card
                title={row.column}
                average={SetPrecision(row.avg)}
                min={SetPrecision(row.min)}
                max={SetPrecision(row.max)}
                averageWeeks={SetPrecision(row.weekAvg)}
                minWeeks={SetPrecision(row.weeksMin)}
                maxWeeks={SetPrecision(row.weeksMax)}
                key={row.key}
                colour={row.colour}
                type={row.type} 
                onPress={() => displayInfo(row)}
                />
        });

    }

    const displayInfo = cardInfo => {
        setDisplayVisible(true);
        setSelectedItem(cardInfo);
    };

    !appOffline ? displayCards(refreshedList, weeksList) : displayCards(list, weeksList);

    return (
        <Container dark={true}>
            <CardDetail item={selectedItem} visible={displayVisible} onClose={() => setDisplayVisible(false)} />
            <LargeText style={{ marginVertical: 15 }}>{name}'s Summary</LargeText>
            {Cards}
        </Container>
    );
};
export default Dashboard;