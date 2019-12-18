import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native';
import ListItem from '../components/ListItem';
import formatDate from '../helper/helper';
import PropTypes from "prop-types";

// import Deliveries from './Deliveries';

const MainList = props => {

    const { firebaseList } = props;
    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('dayNumber');

    
    const checkIfTodayExists = () => {//not working yet
        const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
        const today = new Date;

        let lastDayOnDB = new Date(firebaseList[firebaseList.length - 1].actualDay);

        let daysUntil = Math.round(Math.abs((today - lastDayOnDB) / oneDay));

        console.log(daysUntil);

        // while(daysUntil > 0)
        // {//while the number of days until today is positive, add a week
        //     for(let i = 0; i < 7; i++){
        //         lastDayOnDB = new Date(firebaseList[firebaseList.length - 1].actualDay);

        //         lastDayOnDB.setDate(lastDayOnDB.getDate() + 1);
                
        //     }
        //     console.log(daysUntil);
        // }
        
    };

    const updateOrientation = () => 
    {
        if(orientation !== 'Asc')
        {
            setOrientation('Asc');
        }
        else if(orientation !== 'Desc')
        {
            setOrientation('Desc');
        }
    };

    const sortList = () => {

        if (orientation === 'Asc') {
            console.log('returning ascending', columnToSort);
            return firebaseList.sort((b, a) => { return (b[columnToSort]) - (a[columnToSort]) });
        }
        else if (orientation === 'Desc'){
            console.log('returning descending', columnToSort);
            return firebaseList.sort((a, b) => { return (b[columnToSort]) - (a[columnToSort]) });
        }
            

    };

    const updateColumn = () => {
        Alert.alert('Select column to sort','Days, Deliveroo or Uber', [{text:'Days', style:'cancel', onPress:() => setColumnToSort('dayNumber') }, {text:'Deliveroo', style:'cancel', onPress:() => setColumnToSort('deliveroo') }, {text:'Uber', style:'cancel', onPress:() => setColumnToSort('uber') } ] )
    };

    const openAlert = (date) => {
        Alert.alert('Selected date', formatDate(date), [{ text: 'Yay!', style: 'cancel' }]);
    }

    const setLabelText = (columnToSort, orientation) => {
        let text = '';
        if(columnToSort === 'dayNumber'){
            text += 'Days';
        }
        else if(columnToSort === 'deliveroo'){
            text += 'Deliveroo';
        }
        else if(columnToSort === 'uber'){
            text += 'Uber';
        }

        if(orientation === 'Asc'){
            text += ' /\\';
        }
        else if(orientation === 'Desc'){
            text += ' \\/';
        }
        else text = 'something went wrong';

        return text;
    };

    checkIfTodayExists();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => updateOrientation()} onLongPress={() => updateColumn()}>
                    <Text style={styles.sortLabel}> {setLabelText(columnToSort, orientation)} </Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.list}

                    data={sortList()}

                    renderItem={(item) =>
                        (

                            // <Text>{ JSON.stringify(item.actualDay) }</Text>
                            <TouchableOpacity onPress={() => { openAlert(item.item['actualDay']); console.log(item.item) }}>
                                <ListItem
                                    id={item.item.dayNumber}
                                    date={item.item.actualDay}
                                    del={item.item.deliveroo}
                                    ub={item.item.uber}
                                    hours={item.item.hours}
                                    columnToSort = {columnToSort}
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontStyle: 'italic'
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
        marginBottom: 15
    }
});

MainList.propTypes = {
    firebaseList: PropTypes.array.isRequired
};

export default MainList;

{/* <FlatList
    style={styles.list}

    // DELIVERIES is a local array
    // sorted by date
    data={DELIVERIES.sort((a, b) => { return new Date(b.actualDay) - new Date(a.actualDay) })}

    // data={props.firebaseList.sort((a, b) => { return new Date(b.actualDay) - new Date(a.actualDay) })}

    // data={DELIVERIES}

    renderItem={({ item }) =>
    (

        <Text>{ JSON.stringify(item.item.actualDay) }</Text>
        // <TouchableOpacity onPress={() => { openAlert(item.actualDay) }}>
        //     <ListItem
        //         date={item.actualDay}
        //         deliveroo={item.deliveroo}
        //         uber={item.uber}
        //         hours={item.hours}
        //     />
        // </TouchableOpacity>
    )}

    keyExtractor={item => item.actualDay} /> */}