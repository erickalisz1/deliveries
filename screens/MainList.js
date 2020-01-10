import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
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
import { setLabelText, sortList, checkIfTodayExists, assignDay, fixDisplay, nextDay } from '../assets/helper/helper';
import { SPACE, LARGER, LARGER_EQUAL, SMALLER, SMALLER_EQUAL } from '../assets/constants/strings';
import Deliveries from '../assets/models/Deliveries';
import { myStyles } from '../assets/helper/Styles';
import Colours from '../assets/constants/darkTheme';
import { Ionicons } from '@expo/vector-icons';
import FiltersModal from '../components/modals/FiltersModal';
import SmallText from '../components/SmallText';
import Row from '../components/Row';


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
    const [activeFilter, setActiveFilter] = useState('');

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

    // handling refresh
    const listLoaded = (loadedList) => {
        setIsLoading(false);
        setDeliveriesList(loadedList);
        setFirebaseList(loadedList);//stock list with no filters
        setIsRefreshing(false);
        setIsOpeningApp(checkIfTodayExists(loadedList, isOpeningApp));
        // setIsOpeningApp(false);
    }

    const filterList = (list, column, isRange, value, valueEnd, condition) => {

        if (!isRange) {

            value = value === '' ? '0' : value;//if it wasn't set, make it 0

            value = Number(value);

            if (column === 'dayNumber' && value < 7) {

                list = list.filter(item => new Date(item.actualDay).getDay() === value)

            }
            else if (column === 'dayNumber' && value === 7){//selected "weekdays"
                list = list.filter(item => new Date(item.actualDay).getDay() > 0 && new Date(item.actualDay).getDay() < 5) // monday to thursday
            }
            else if (column === 'dayNumber' && value === 8){//selected "weekends"
                list = list.filter(item => new Date(item.actualDay).getDay() === 0 || new Date(item.actualDay).getDay() > 4) // friday, saturday, sunday
            }
            else {

                if (condition === LARGER) {
                    list = list.filter(item => item[column] > value);
                }
                else if (condition === LARGER_EQUAL) {
                    list = list.filter(item => item[column] >= value);
                }
                else if (condition === SMALLER) {
                    list = list.filter(item => item[column] > 0 && item[column] < value);
                }
                else if (condition === SMALLER_EQUAL) {
                    list = list.filter(item => item[column] > 0 && item[column] <= value);
                }

            }
        }
        else {
            value === '' || valueEnd === '' ? list = [] : null;//if no values are set

            if (column === 'dayNumber') {

                console.log('start:', value, 'end:', valueEnd);

                value++;
                value = value === 7 ? 0 : value;//if it returns 6, its sunday and we must change it to sent it to the new Date()

                console.log('after ifs: start:', value, 'end:', valueEnd);

                list = list.filter(item => new Date(item.actualDay).getDay() >= value && new Date(item.actualDay).getDay() <= valueEnd)
            }
            else {
                console.log('column', column, 'value', value, 'valueEnd', valueEnd);
                list = list.filter(item => item[column] >= value && item[column] <= valueEnd);
            }
        }


        if (list.length < 1) {//if sorting returns no results
            Alert.alert('No values to display');
        }
        else {
            setDeliveriesList(list);
            setOrientation('Asc');
            setDisplayFilters(false);


            //fixing column display
            if (isRange) {
                column !== 'dayNumber' ? (//if its not the days
                    fixDisplay.forEach(item => {
                        item.value === column ? setActiveFilter(item.display + condition + value + ' and ' + valueEnd) : null
                    })//e.g (Uber > 100)
                ) : null;
            }

            else column !== 'dayNumber' ? (//if its not the days
                fixDisplay.forEach(item => { item.value === column ? setActiveFilter(item.display + SPACE + condition + SPACE + value) : null })//e.g (Uber > 100)
            ) : (
                    assignDay.forEach(item => { item.value === value ? setActiveFilter(item.display) : null })
                );



            column === 'hours' ? setColumnToSort('total') : setColumnToSort(column);// there is no hours sort

        }

    };

    //handling update day
    const updateDay = () => {
        setDisplayDetail(false);
        setDisplayUpdate(true);
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

    const clearFilters = () => {
        setDeliveriesList(firebaseList);
        setOrientation('Desc');
        setColumnToSort('dayNumber');
        setActiveFilter('');
    };

    const findNext = (id, direction) => {

        direction === '<' ? id-- : id++;

        setSelectedDay(firebaseList.find((value) => value.dayNumber === id));
    };

    isLoading ? renderList() : null;

    return (
        <Container dark={true}>

            {/* conditional rendering */}

            {isLoading ? (<Loading />) : (
                <View>

                    <ColumnsModal visible={displayColumns} selectColumn={getModalResult} onClose={() => setDisplayColumns(false)} />
                    <UpdateDays visible={displayUpdate} dayToUpdate={selectedDay} onClose={() => setDisplayUpdate(false)} next={findNext}/>
                    <DetailModal visible={displayDetail} edit={updateDay} day={selectedDay} list={firebaseList} onClose={() => setDisplayDetail(false)}/>
                    <FiltersModal visible={displayFilters} result={filterList} list={firebaseList} clear={clearFilters} onClose={() => setDisplayFilters(false)}/>


                    <View style={myStyles.topContainer}>

                        <TouchableOpacity onPress={() => setDisplayColumns(true)} style={{ flex: 4 }}>
                            <SortingButton text={setLabelText(columnToSort, orientation, 'column')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => toggleOrientation()} style={{ flex: 4 }}>
                            <SortingButton text={setLabelText(columnToSort, orientation, 'orientation')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setDisplayFilters(true)} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                            <Ionicons name='ios-options' size={25} color={activeFilter === '' ? Colours.primaryText : Colours.success} />
                        </TouchableOpacity>
                    </View>

                    {activeFilter !== '' ? (
                        <Row style={{margin:20, justifyContent:'space-around', maxWidth:'95%'}}>
                            <Ionicons name='ios-color-filter' size={24} color={Colours.success} />
                            <SmallText>{activeFilter}</SmallText>
                            <Ionicons name='ios-color-filter' size={24} color={Colours.success} />
                        </Row>
                    ) : null}

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.dayNumber)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}

                        renderItem={(item) =>
                            (
                                <TouchableOpacity
                                    onPress={() => { setSelectedDay(item.item); setDisplayDetail(true); }}
                                    // onLongPress={() => updateDay(item.item)}
                                    >

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