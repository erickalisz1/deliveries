import React, { useState } from 'react';
import firebase from 'firebase';
import { View, FlatList, Alert, Platform, TouchableOpacity } from 'react-native';

import Container from '../components/Container';
import WeekItem from '../components/WeekItem';
import Weeks from '../assets/models/Weeks';
import Loading from '../components/Loading';
import ColumnsModal from '../components/modals/ColumnsModal';
import { setLabelText, sortList, SetPrecision, weekFilters } from '../assets/helper/helper';
import { myStyles } from '../assets/helper/Styles';
import DetailModal from '../components/modals/DetailModal';
import SortingButton from '../components/SortingButton';
import Colours from '../assets/constants/darkTheme';
import FiltersModal from '../components/modals/FiltersModal';
import { Ionicons } from '@expo/vector-icons';
import { SPACE, LARGER, LARGER_EQUAL, SMALLER, SMALLER_EQUAL } from '../assets/constants/strings';
import SmallText from '../components/SmallText';

const WeeksList = () => {

    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('week');
    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(null);

    const [displayFilters, setDisplayFilters] = useState(false);

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);
    const [firebaseList, setFirebaseList] = useState([]);//the original list
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [activeFilter, setActiveFilter] = useState('');
    const [filterColour, setFilterColour] = useState(Colours.primaryText);

    const renderList = () => {

        let localList = [];

        let started = new Date();

        //declaring them outside loops to don't loose them after iterations
        let daysCount = 0;
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
        setFirebaseList(loadedList);//stock list with no filters
    }

    const filterList = (list, column, isRange, value, valueEnd, condition) => {

        if (!isRange) {

            value = value === '' ? '0' : value;//if it wasn't set, make it 0

            value = Number(value);


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
        else {
            value === '' || valueEnd === '' ? list = [] : null;//if no values are set

            if (column === 'dayNumber') {

                value++;
                value = value === 7 ? 0 : value;//if it returns 6, its sunday and we must change it to sent it to the new Date()

                list = list.filter(item => new Date(item.actualDay).getDay() >= value && new Date(item.actualDay).getDay() <= valueEnd)
            }
            else {
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
                weekFilters.forEach(item => {
                    if (item.value === column) {
                        setActiveFilter(item.key + condition + value + ' and ' + valueEnd);
                        setFilterColour(item.colour)
                    }
                    else null
                })//e.g (Uber > 100)
            }

            else
                weekFilters.forEach(item => {
                    if (item.value === column) {
                        setActiveFilter(item.key + SPACE + condition + SPACE + value);
                        setFilterColour(item.colour)
                    }
                    else null;
                })//e.g (Uber > 100)



            column === 'hours' ? setColumnToSort('total') : setColumnToSort(column);// there is no hours sort

        }

    };

    const toggleOrientation = () => {//switching orientations
        orientation === 'Asc' ? setOrientation('Desc') : setOrientation('Asc');
    };

    const handleColumnResult = (selectedColumn, colour) => {//handle selected value from columns modal
        setColumnToSort(selectedColumn);
        setFilterColour(colour);
        setDisplayColumns(false);
    };

    const handleRefresh = () => {//refresh list
        setIsRefreshing(true);
        setIsLoading(true);
        setActiveFilter('');
        setFilterColour(Colours.primaryText);
    };

    const clearFilters = () => {
        setDeliveriesList(firebaseList);
        setOrientation('Desc');
        setColumnToSort('week');
        setActiveFilter('');
        setFilterColour(Colours.primaryText);
    };

    const modals = <View>
        <ColumnsModal week visible={displayColumns} onClose={() => setDisplayColumns(false)} selectColumn={handleColumnResult} />
        <DetailModal visible={displayDetail} onClose={() => setDisplayDetail(false)} week={selectedWeek} />
        <FiltersModal week visible={displayFilters} result={filterList} list={firebaseList} clear={clearFilters} onClose={() => setDisplayFilters(false)} />
    </View>;

    const topContainer = <View style={myStyles.topContainer}>

        <View style={{ marginLeft: 10 }}></View>

        <SortingButton
            text={setLabelText(columnToSort, orientation, 'column')}
            colour={filterColour}
            onPress={() => setDisplayColumns(true)}
            style={{ flex: 4 }} />

        <SortingButton
            text={setLabelText(columnToSort, orientation, 'orientation')}
            colour={filterColour}
            onPress={() => toggleOrientation()}
            style={{ flex: 4 }} />

        <TouchableOpacity onPress={() => setDisplayFilters(true)} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
            <Ionicons name='ios-color-filter' size={25} color={filterColour} />
        </TouchableOpacity>

    </View>;

    const displayActiveFilter =

        activeFilter !== '' ? (
            <View style={myStyles.activeFilterContainer}>
                <Ionicons name='ios-color-filter' size={24} color={filterColour} />
                <SmallText between={20}>{activeFilter}</SmallText>
                <Ionicons name='ios-color-filter' size={24} color={filterColour} />
            </View>
        ) : null;

    isLoading ? renderList() : '';

    return (
        <Container dark={true}>
            {/* conditional rendering */}
            {isLoading ? (<Loading />) : (
                <View>

                    {modals}

                    {topContainer}

                    {displayActiveFilter}

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.week)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}

                        style={{ maxWidth: activeFilter === '' ? '100%' : '97.5%', marginHorizontal: activeFilter === '' ? 0 : '2.5%' }}

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