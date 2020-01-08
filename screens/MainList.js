import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Platform, Picker } from 'react-native';
import firebase from 'firebase';

//components
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import ColumnsModal from '../components/modals/ColumnsModal';
import UpdateDays from '../components/modals/UpdateDays';
import Container from '../components/Container';
import DetailModal from '../components/modals/DetailModal';
import SortingButton from '../components/SortingButton';

// assets
import { setLabelText, sortList, checkIfTodayExists } from '../assets/helper/helper';
import Deliveries from '../assets/models/Deliveries';
import { myStyles } from '../assets/helper/Styles';
import Colours from '../assets/constants/darkTheme';
import { Ionicons } from '@expo/vector-icons';
import FiltersModal from '../components/modals/FiltersModal';


const MainList = (props) => {

    //display settings states
    //default list display
    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('dayNumber');
    //modals
    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [displayFilters, setDisplayFilters] = useState(false);
    //update
    const [selectedDay, setSelectedDay] = useState(null);

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);//the list source, always changing with the filters
    const [firebaseList, setFirebaseList] = useState([]);//the original list
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isOpeningApp, setIsOpeningApp] = useState(true);

    const renderList = () => {

        let localList = [];

        let start = new Date();
        let daysCount = 1;//started on tuesday
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

    // handling refresh
    const listLoaded = (loadedList) => {
        // loadedList = loadedList.filter(item => new Date(item.actualDay).getFullYear() > 2019)
        setIsLoading(false);
        setDeliveriesList(loadedList);
        setFirebaseList(loadedList);
        setIsRefreshing(false);
        setIsOpeningApp(checkIfTodayExists(loadedList, isOpeningApp));
        // setIsOpeningApp(false);
    }

    const filterList = (list, column, value, valueEnd, condition) => {

        value = Number(value);

        // console.log(,column);

        if(condition === 'larger'){
            list = list.filter( item => item[column] > value);
            console.log('on filterList function: ',list)
            setDeliveriesList(list);
        }

        column = column === 'hours' ? 'dayNumber' : column;// there is no hours sort

        setColumnToSort(column);
        setOrientation('Asc');
        setDisplayFilters(false);
    };

    //handling update day
    const updateDay = (dayToUpdate) => {
        setDisplayUpdate(true);
        setSelectedDay(dayToUpdate);
    };

    const toggleOrientation = () => {//switching orientations
        orientation === 'Asc' ? setOrientation('Desc') : setOrientation('Asc');
    };

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
                    <DetailModal visible={displayDetail} onClose={() => setDisplayDetail(false)} day={selectedDay} list={deliveriesList} />
                    <FiltersModal visible={displayFilters} onClose={() => setDisplayFilters(false)} result={filterList} list={firebaseList}/> 
                    

                    <View style={myStyles.topContainer}>

                        <TouchableOpacity onPress={() => setDisplayColumns(true)} style={{ flex: 4 }}>
                            <SortingButton text={setLabelText(columnToSort, orientation, 'column')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleOrientation()} style={{ flex: 4 }}>
                            <SortingButton text={setLabelText(columnToSort, orientation, 'orientation')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setDisplayFilters(true)} style={{ flex: 1, alignItems: 'flex-end' }}>
                            <Ionicons name='ios-options' size={25} color={Colours.primaryText} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.dayNumber)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}

                        renderItem={(item) =>
                            (
                                <TouchableOpacity
                                    onPress={() => { setSelectedDay(item.item); console.log(item.item.per); setDisplayDetail(true); }}
                                    onLongPress={() => updateDay(item.item)}>

                                    <ListItem
                                        selectedDay={item.item}
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


export default MainList;