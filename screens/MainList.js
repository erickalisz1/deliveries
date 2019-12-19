import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native';
import PropTypes from "prop-types";

import ListItem from '../components/ListItem';
import Colours from '../constants/colours';
import ColumnsModal from '../components/ColumnsModal';
import { setLabelText, sortList, setDateString, setAlertMessage } from '../helper/helper';

// import Deliveries from './Deliveries';

const MainList = props => {

    const { firebaseList } = props;
    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('dayNumber');
    const [displayModal, setDisplayModal] = useState(false);

    // console.log('Main list Screen',firebaseList);

    const checkIfTodayExists = () => {//not working yet
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const today = new Date;

        // console.log(firebaseList[firebaseList.length - 1]);

        const lastDayOnDB = new Date(firebaseList[0].actualDay);

        let daysUntil = Math.round(Math.abs((today - lastDayOnDB) / oneDay));

        Alert.alert('Days from last day on', daysUntil);

        // while(daysUntil > 0)
        // {//while the number of days until today is positive, add a week
        //     for(let i = 0; i < 7; i++){
        //         lastDayOnDB = new Date(firebaseList[firebaseList.length - 1].actualDay);

        //         lastDayOnDB.setDate(lastDayOnDB.getDate() + 1);

        //     }
        //     console.log(daysUntil);
        // }

    };
    // checkIfTodayExists();

    const updateOrientation = () => {
        if (orientation !== 'Asc') {
            setOrientation('Asc');
        }
        else if (orientation !== 'Desc') {
            setOrientation('Desc');
        }
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
        setDisplayModal(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ColumnsModal visible={displayModal} onClose={() => setDisplayModal(false)} selectColumn={getModalResult} />
            <View>
                <TouchableOpacity onPress={() => updateOrientation()} onLongPress={() => {/*updateColumn();*/ setDisplayModal(true) }}>
                    <Text style={styles.sortLabel}> {setLabelText(columnToSort, orientation)} </Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.list}

                    data={sortList(firebaseList, columnToSort, orientation)}

                    renderItem={(item) =>
                        (
                            <TouchableOpacity onPress={() => { openAlert(item.item); console.log(item.item) }}>
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

                    keyExtractor={item => JSON.stringify(item.dayNumber)} />

            </View>
        </SafeAreaView>

    );


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colours.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontStyle: 'italic',

    },
    item: {
        marginVertical: 1,
        minWidth: '100%',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'

    },
    value: {
        fontSize: 16,
    },
    sortLabel: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 15 : 35,
        marginBottom: 15,
        color: Colours.primaryText
    }
});

MainList.propTypes = {
    firebaseList: PropTypes.array.isRequired
};

export default MainList;