import React, { useState } from 'react';
import firebase from 'firebase';
import { View, FlatList, Text, Platform, TouchableOpacity } from 'react-native';

import Container from '../components/Container';
import WeekItem from '../components/WeekItem';
import Weeks from '../assets/models/Weeks';
import Loading from '../components/Loading';
import ColumnsModal from '../components/modals/ColumnsModal';
import { setLabelText, sortList, SetPrecision } from '../assets/helper/helper';
import { myStyles } from '../assets/helper/Styles';
import DetailModal from '../components/modals/DetailModal';

const WeeksList = () => {

    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('week');
    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const renderList = () => {

        let localList = [];

        let started = new Date();

        //declaring them outside loops to don't loose the mafter iterations
        let daysCount = 1;//started on tuesday
        let weekNumber = 0;
        let delSum = 0, ubSum = 0, hoursSum = 0;
        let daysWithDel = 0, daysWithUber = 0, daysWithHours = 0;
        let weekStart = '';

        console.log('Fetching List...');

        let query = firebase.database().ref('deliveries/').orderByKey();

        // SELECT * STATEMENT
        query.once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {

                let week = new Weeks();

                //incrementing sums
                delSum += childSnapshot.val().deliveroo;
                ubSum += childSnapshot.val().uber;
                hoursSum += childSnapshot.val().hours;

                //checkning the days with data
                daysWithDel = childSnapshot.val().deliveroo === 0 ? daysWithDel : daysWithDel += 1;//if its zero, dont increase the count
                daysWithUber = childSnapshot.val().uber === 0 ? daysWithUber : daysWithUber += 1;
                daysWithHours = childSnapshot.val().hours === 0 ? daysWithHours : daysWithHours += 1;

                //because I started on a tuesday
                if (childSnapshot.key === '1') {
                    weekStart = childSnapshot.val().actualDay;
                }

                if (daysCount === 0) {
                    weekStart = childSnapshot.val().actualDay;
                }

                daysCount += 1;

                if (daysCount === 7) {//end of week reached
                    daysCount = 0;

                    week.week = weekNumber;
                    week.deliveroo = SetPrecision(delSum);
                    week.uber = SetPrecision(ubSum);
                    week.hours = SetPrecision(hoursSum);
                    week.total = SetPrecision(week.deliveroo + week.uber);

                    week.hours > 0 ? (week.per = SetPrecision(week.total / week.hours)) : (week.per = 0);

                    week.start = weekStart;
                    week.end = childSnapshot.val().actualDay;

                    //checking if it has accurate data by evaluating if the number of days with all 3 values is the same
                    if (daysWithHours !== daysWithDel && daysWithHours !== daysWithUber) {
                        week.accurate = false;
                    }
                    else week.accurate = true;

                    localList.push(week);

                    //resetting values for next iteration
                    daysWithHours = 0;
                    daysWithDel = 0;
                    daysWithUber = 0;

                    delSum = 0;
                    ubSum = 0;
                    hoursSum = 0;
                    //increment week number
                    weekNumber += 1;
                }
            });

            //finished building list
            let finish = new Date();
            console.log((finish - started) + 'ms to fetch list on', Platform.OS);

        }).then(() => { listLoaded(localList) });
    };

    // handling refresh
    const listLoaded = (loadedList) => {
        setIsLoading(false);
        setIsRefreshing(false);
        setDeliveriesList(loadedList);
    }

    const toggleOrientation = () => {//switching orientations
        orientation === 'Asc' ? setOrientation('Desc') : setOrientation('Asc');
    };

    const getModalResult = (selectedColumn) => {//handle selected value from columns modal
        setColumnToSort(selectedColumn);
        setDisplayColumns(false);
    };

    const handleRefresh = () => {//refresh list
        setIsRefreshing(true);
        setIsLoading(true);
    };

    isLoading ? renderList() : '';

    return (
        <Container dark={true}>
            {/* conditional rendering */}
            {isLoading ? (<Loading/>) : (
                <View>

                    <ColumnsModal visible={displayColumns} onClose={() => setDisplayColumns(false)} selectColumn={getModalResult} week={true} />
                    <DetailModal visible={displayDetail} onClose={() => setDisplayDetail(false)} week={selectedWeek} />

                    <TouchableOpacity
                        onPress={() => toggleOrientation()}
                        onLongPress={() => setDisplayColumns(true)}>

                        <Text style={myStyles.sortLabel}> {setLabelText(columnToSort, orientation)} </Text>

                    </TouchableOpacity>

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.week)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        style={{ maxWidth: '95%' }}

                        renderItem={(item) =>
                        (
                            <TouchableOpacity
                                onPress={() => { setSelectedWeek(item.item); setDisplayDetail(true); }}>

                                <WeekItem
                                    selectedWeek={item.item}
                                    column={columnToSort}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

        </Container>
    );
};

export default WeeksList;