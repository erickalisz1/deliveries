import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity, Alert, Platform } from 'react-native';
import { DELIVERIES } from '../dummy-data';
import ListItem from '../components/ListItem';
import  formatDate  from '../helper/helper';
// import Deliveries from './Deliveries';

const MainList = props => {

    const openAlert = (date) => {
        Alert.alert('Selected date', formatDate(date), [{ text: 'Yay!', style: 'cancel' }]);
    }

    let sortLabel = 'Days \\/';
    // console.log('assigning sort label at ' + new Date().getSeconds());
    // console.log(props.firebaseList);
    // const newArr = props.firebaseList;
    // console.log(DELIVERIES);
    // let myArr = Object.values(props.firebaseList);
    // console.log(myArr);



    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity >
                    <Text style={styles.sortLabel}> {sortLabel} </Text>
                </TouchableOpacity>

                <FlatList
                    style={styles.list}

                    data={DELIVERIES.sort((a, b) => { return new Date(b.actualDay) - new Date(a.actualDay) })}
                    
                    renderItem={ ({item})  =>
                        ( 
                            
                        // <Text>{ item.item.actualDay }</Text>
                            <TouchableOpacity onPress={() => { openAlert(item.actualDay) }}>
                                <ListItem
                                    date={item.actualDay}
                                    deliveroo={item.deliveroo}
                                    uber={item.uber}
                                    hours={item.hours}
                                />
                            </TouchableOpacity>
                        )}

                    keyExtractor={item => item.actualDay} />

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
        minWidth: '95%',
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
        marginBottom: 10
    }
});



export default MainList;