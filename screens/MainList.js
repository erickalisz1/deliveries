import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

//components
import Loading from '../components/Loading';
import ListItem from '../components/ListItem';
import ColumnsModal from '../components/modals/ColumnsModal';
import UpdateDays from '../components/modals/UpdateDays';
import Container from '../components/Container';
import DetailModal from '../components/modals/DetailModal';
import SortingButton from '../components/SortingButton';

// assets
import { setLabelText, sortList, checkIfTodayExists, assignDay, filters } from '../assets/helper/helper';
import { SPACE, LARGER, LARGER_EQUAL, SMALLER, SMALLER_EQUAL } from '../assets/constants/strings';
import { myStyles } from '../assets/helper/Styles';
import Colours from '../assets/constants/darkTheme';
import FiltersModal from '../components/modals/FiltersModal';
import SmallText from '../components/SmallText';


const MainList = () => {

    const list = useSelector(state => state.user.userDaysList);
    console.log('daysList.length',list.length);

    //display settings states
    //default list display
    const [orientation, setOrientation] = useState('Desc');
    const [columnToSort, setColumnToSort] = useState('dayNumber');
    //modals
    const [displayColumns, setDisplayColumns] = useState(false);
    const [displayUpdate, setDisplayUpdate] = useState(false);
    const [displayDetail, setDisplayDetail] = useState(false);
    const [displayFilters, setDisplayFilters] = useState(false);
    //update / detail
    const [selectedDay, setSelectedDay] = useState(null);

    //fetch data from firebase states
    const [isLoading, setIsLoading] = useState(true);
    const [deliveriesList, setDeliveriesList] = useState([]);//the list source, always changing with the filters
    const [firebaseList, setFirebaseList] = useState([]);//the original list
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isOpeningApp, setIsOpeningApp] = useState(true);

    //filtering
    const [activeFilter, setActiveFilter] = useState('');
    const [filterColour, setFilterColour] = useState(Colours.primaryText);


    // handling refresh
    const listLoaded = (loadedList) => {
        setIsLoading(false);
        setDeliveriesList(loadedList);
        setFirebaseList(loadedList);//stock list with no filters
        setIsRefreshing(false);
        setIsOpeningApp(checkIfTodayExists(loadedList, isRefreshing));
    }

    const filterList = (list, column, isRange, value, valueEnd, condition) => {

        if (!isRange) {

            value = value === '' ? '0' : value;//if it wasn't set, make it 0

            value = Number(value);

            if (column === 'dayNumber' && value < 7) {

                list = list.filter(item => new Date(item.actualDay).getDay() === value)

            }
            else if (column === 'dayNumber' && value === 7) {//selected "weekdays"
                list = list.filter(item => new Date(item.actualDay).getDay() > 0 && new Date(item.actualDay).getDay() < 5) // monday to thursday
            }
            else if (column === 'dayNumber' && value === 8) {//selected "weekends"
                list = list.filter(item => new Date(item.actualDay).getDay() === 0 || new Date(item.actualDay).getDay() > 4) // friday, saturday, sunday
            }
            else {

                if (condition === LARGER) {
                    list = list.filter(item => item[column] > value);
                    setOrientation('Asc');
                }
                else if (condition === LARGER_EQUAL) {
                    list = list.filter(item => item[column] >= value);
                    setOrientation('Asc');
                }
                else if (condition === SMALLER) {
                    list = list.filter(item => item[column] > 0 && item[column] < value);
                    setOrientation('Desc');
                }
                else if (condition === SMALLER_EQUAL) {
                    list = list.filter(item => item[column] > 0 && item[column] <= value);
                    setOrientation('Desc');
                }

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
            setDisplayFilters(false);

            //fixing column display
            if (isRange) {
                column !== 'dayNumber' ? (//if its not the days
                    filters.forEach(item => {
                        if (item.value === column) {
                            setActiveFilter(item.key + condition + value + ' and ' + valueEnd);
                            setFilterColour(item.colour)
                        }
                        else null
                    })//e.g (Uber > 100)
                ) : null;
            }
            else
                filters.forEach(item => {
                    if (item.value === column) {
                        //if its not the days
                        column !== 'dayNumber' ? setActiveFilter(item.key + SPACE + condition + SPACE + value) : null;
                        setFilterColour(item.colour)
                    }
                    else null;
                })//e.g (Uber > 100)

            column === 'dayNumber' ? (assignDay.forEach(item => { item.value === value ? setActiveFilter(item.display) : null })) : null;


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

    //apllying selected column to sort list
    const handleColumnResult = (selectedColumn, colour) => {
        setColumnToSort(selectedColumn);
        setFilterColour(colour);
        setDisplayColumns(false);
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
        setActiveFilter('');
        setFilterColour(Colours.primaryText);
    };

    const clearFilters = () => {
        setDeliveriesList(firebaseList);
        setOrientation('Desc');
        setColumnToSort('dayNumber');
        setActiveFilter('');
        setFilterColour(Colours.primaryText);
    };

    //iterate through days on update modal
    const findNext = (id, direction) => {

        direction === '<' ? id-- : id++;

        setSelectedDay(firebaseList.find((value) => value.dayNumber === id));
    };

    const selectDay = day => {
        setSelectedDay(day);
        setDisplayUpdate(true);
    };

    //simple alert with the length of the filtered list
    const displayFilterCount = () => {

        let times = deliveriesList.length;

        Alert.alert(
            activeFilter, //title
            (times !== 1) ? ('Occurred ' + times + ' times') : 'Occurred once' //message
        );
    };

    const modals = <View>
        <ColumnsModal visible={displayColumns} selectColumn={handleColumnResult} onClose={() => setDisplayColumns(false)} />
        <UpdateDays visible={displayUpdate} dayToUpdate={selectedDay} onClose={() => setDisplayUpdate(false)} next={findNext} />
        <DetailModal visible={displayDetail} edit={updateDay} day={selectedDay} list={firebaseList} onClose={() => setDisplayDetail(false)} />
        <FiltersModal visible={displayFilters} result={filterList} list={firebaseList} clear={clearFilters} onClose={() => setDisplayFilters(false)} />
    </View>;

    const topContainer = <View style={myStyles.topContainer}>

        <View style={{ marginLeft: 10 }}></View>

        <SortingButton
            text={setLabelText(columnToSort, orientation, 'column')}
            colour={filterColour}
            onPress={() => setDisplayColumns(true)}
            style={{ flex: 4 }}
        />

        <SortingButton
            text={setLabelText(columnToSort, orientation, 'orientation')}
            colour={filterColour}
            onPress={() => toggleOrientation()}
            style={{ flex: 4 }}
        />


        <TouchableOpacity onPress={() => setDisplayFilters(true)} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
            <Ionicons name='ios-color-filter' size={25} color={filterColour} />
        </TouchableOpacity>
    </View>;

    const displayActiveFilter =

        activeFilter !== '' ? (
            <TouchableOpacity style={myStyles.activeFilterContainer} onPress={() => displayFilterCount()}>
                <Ionicons name='ios-color-filter' size={24} color={filterColour} />
                <SmallText between={20}>{activeFilter}</SmallText>
                <Ionicons name='ios-color-filter' size={24} color={filterColour} />
            </TouchableOpacity>
        ) : null;

    isLoading ? listLoaded(list) : null;

    return (
        <Container dark={true}>

            {/* conditional rendering */}

            {isLoading ? (<Loading />) : (
                <View>

                    {modals}

                    {topContainer}

                    {displayActiveFilter}

                    <FlatList
                        keyExtractor={item => JSON.stringify(item.dayNumber)}
                        data={sortList(deliveriesList, columnToSort, orientation)}
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}

                        style={{ maxWidth: activeFilter === '' ? '100%' : '97.5%', marginHorizontal: activeFilter === '' ? 0 : '2.5%' }}

                        renderItem={(item) =>
                            (
                                <TouchableOpacity
                                    onPress={() => { setSelectedDay(item.item); setDisplayDetail(true) }}>

                                    <ListItem
                                        selectedDay={item.item}
                                        columnToSort={columnToSort}
                                        onPress={selectDay}
                                        buttonColour={filterColour}
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