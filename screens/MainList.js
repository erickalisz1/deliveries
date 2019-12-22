import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import firebase from 'firebase';

import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import Colours from '../constants/colours';
import ColumnsModal from '../components/ColumnsModal';
import { setLabelText, sortList, setDateString, setAlertMessage } from '../helper/helper';

import Deliveries from '../Deliveries';
import UpdateDays from '../components/UpdateDays';
import Container from '../components/Container';

const MainList = () => {

    //display settings
    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('dayNumber');
    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const renderList = () => {

        let localList = [];

        console.log('calling render function at ', new Date().getMilliseconds() + 'ms')

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

                // console.log('Hours: '+ delivery.hours, 'Per: '+ delivery.per );

                localList.push(delivery);

            });

            //finished building list
            console.log('finished building list at ', new Date().getMilliseconds() + 'ms');
        }).then(() => { listLoaded(localList) });
    };

    // handling refresh
    const listLoaded = (loadedList) => {
        setIsLoading(false);
        setDeliveriesList(loadedList);
        setIsRefreshing(false);
    }

    //handling update day
    const updateDay = (dayToUpdate) => {
        setDisplayUpdate(true);
        setSelectedDay(dayToUpdate);        
    };

    const updateOrientation = () => 
    {//switching orientations
        // if (orientation !== 'Asc') {
        //     setOrientation('Asc');
        // }
        // else if (orientation !== 'Desc') {
        //     setOrientation('Desc');
        // }

        orientation === 'Asc' ? setOrientation('Desc') : setOrientation('Asc') ;
    };

    const openAlert = (selectedDay) => {

        Alert.alert(
            setDateString(selectedDay.actualDay), //title
            setAlertMessage(selectedDay), //main message
            [{ text: 'Dismiss', style: 'cancel' }]//buttons
        );
    }

    const getModalResult = (selectedColumn) => {
        setColumnToSort(selectedColumn);
        setDisplayColumns(false);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
    };

    
    isLoading ? renderList() : '';

    return (
        <Container dark={true}>

        {/* conditional rendering */}

            {isLoading ? (<Loading />) : (
                <View>

                    <ColumnsModal visible={displayColumns} onClose={() => setDisplayColumns(false)} selectColumn={getModalResult} />
                    <UpdateDays visible={displayUpdate} onClose={() => setDisplayUpdate(false)} dayToUpdate={selectedDay} />

                    <TouchableOpacity
                        onPress={() => updateOrientation()}
                        onLongPress={() => setDisplayColumns(true)}>

                        <Text style={styles.sortLabel}> {setLabelText(columnToSort, orientation)} </Text>

                    </TouchableOpacity>

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.dayNumber)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}

                        renderItem={(item) =>
                        (
                            <TouchableOpacity 
                                onPress={() => { openAlert(item.item); console.log(item.item) }}
                                onLongPress={() => updateDay(item.item)}>

                                <ListItem
                                    id={item.item.dayNumber}
                                    date={item.item.actualDay}
                                    del={item.item.deliveroo}
                                    ub={item.item.uber}
                                    hours={item.item.hours}
                                    columnToSort={columnToSort}
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    sortLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 15 : 35,
        marginBottom: 15,
        color: Colours.primaryText
    }
});

export default MainList;