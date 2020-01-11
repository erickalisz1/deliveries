import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Picker, Platform, TextInput, Switch, Alert } from 'react-native';
import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays, conditions, weekFilters } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';
import SmallText from '../SmallText';
import Row from '../Row';
import Column from '../Column';
import { DAYS } from '../../assets/constants/strings';
import SortingButton from '../SortingButton';

const FiltersModal = (props) => {

    //value
    const [weekDay, setWeekDay] = useState('0');
    const [condition, setCondition] = useState('>');

    const [filter, setFilter] = useState('dayNumber');
    const [filterColour, setFilterColour] = useState(Colours.primaryText);

    const [weekFilter, setWeekFilter] = useState('deliveroo');
    const [weekFilterColour, setWeekFilterColour] = useState(Colours.deliveroo);

    const [value, setValue] = useState('');
    const [isRange, setIsRange] = useState(false);

    //range
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    // const [weekDayStart, setWeekDayStart] = useState('0');
    // const [weekDayEnd, setWeekDayEnd] = useState('0');
    // const [daysEndList, setDaysEndList] = useState([]);

    const { list } = props;


    //if filter is weekdays
    let pickFilters = props.week ? (
        //if its weeks, filter like this
        weekFilters.map((row, index) => {
            if (row.value !== 'week') {
                if (Platform.OS === 'ios') {
                    return (
                        <Picker.Item label={row.key} value={row.value} key={index} color={row.colour} />
                    );
                }
                else return (
                    <Picker.Item label={row.key} value={row.value} key={index} />
                );
            }

        })
    ) : (
            //if its days
            filters.map((row, index) => {
                if (Platform.OS === 'ios') {
                    return (
                        <Picker.Item label={row.key} value={row.value} key={index} color={row.colour} />
                    );
                }
                else return (
                    <Picker.Item label={row.key} value={row.value} key={index} />
                );
            })
        );

    let rangeFilters = filters.map((row, index) => {

        if (Platform.OS === 'ios') {
            if (row.key !== DAYS) {
                return (
                    <Picker.Item label={row.key} value={row.value} key={index} color={row.colour} />
                );
            }
        }
        else {//android
            if (row.key !== DAYS) {
                return (
                    <Picker.Item label={row.key} value={row.value} key={index} />
                );
            }
            else return <Picker.Item label={"-Select Range-"} value={'Select Range'} key={'index'} />
        }

    });

    //if filter is weekdays
    let daysList = weekDays.map((row, index) => {//{array}.map array is going to be set by state and changed according to what the user selects
        return (
            <Picker.Item label={row} value={index} key={index} />
        );
    });

    let conditionsList = conditions.map((row, index) => {
        return (
            <Picker.Item label={row.key} value={row.value} key={index} />
        );
    });

    const setFilters = () => {

        if (!isRange && filter === 'dayNumber') {//if its a weekDay
            props.result(list, filter, isRange, weekDay, '', '');
        }
        else if (isRange && filter === 'dayNumber') {//if its a range of days
            // props.result(list, filter, isRange, weekDayStart, weekDayEnd, '');
        }
        else if (!isRange && filter !== 'dayNumber') {//if its a single value
            props.result(list, filter, isRange, value, -1, condition);
        }
        else if (isRange && filter !== 'dayNumber' && endValue > startValue) {//if its a range between values, the end value must be larger than the start

            props.result(list, filter, isRange, startValue, endValue, ' between ');
        }
        else Alert.alert('Please chek your values');

    };

    const setWeekFilters = () => {

        if (!isRange) {//if its a single value
            props.result(list, weekFilter, isRange, value, -1, condition);
        }
        else if (isRange && endValue > startValue) {//if its a range between values, the end value must be larger than the start

            props.result(list, weekFilter, isRange, startValue, endValue, ' between ');
        }
        else Alert.alert('Please chek your values');

    };

    const clearFilters = () => {
        props.clear();
        props.onClose();
    };

    const valueInput = (enteredValue) => {
        setValue(enteredValue);
    };

    const startValueInput = (enteredValue) => {
        setStartValue(enteredValue);
        //needs to be more than the other
        setEndValue(Number(++enteredValue) + '');
    };
    const endValueInput = (enteredValue) => {
        setEndValue(enteredValue);
    };

    const handleSwitch = () => {
        isRange ? setIsRange(false) : setIsRange(true)
    };

    const handleFilter = value => {

        filters.forEach(item => {
            if (item.value === value) {
                setFilter(value);
                setFilterColour(item.colour);

                setWeekFilter(value);
                setWeekFilterColour(item.colour);
            }
            else null
        });
    };

    let space;

    space = !isRange || filter === 'dayNumber' ? 5 : 3;

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <ModalSpace flex={space} onClose={props.onClose} />


                    <ModalContainer dark={false}>

                        <SortingButton text='Apply Filters' colour={weekFilterColour} light />

                        {props.week ? (
                            //Weeks List filters
                            <View>
                                <Row>

                                    <SmallText style={{ color: weekFilterColour }}>Value</SmallText>

                                    <Switch
                                        value={isRange}
                                        onValueChange={handleSwitch}
                                        style={{ margin: 20 }}
                                        trackColor={{ false: Colours.backgroundLight, true: weekFilterColour }}
                                    />

                                    <SmallText style={{ color: weekFilterColour }}>Range</SmallText>

                                </Row>

                                {isRange ? (
                                    <View style={{ marginTop: 20 }}>

                                        <Row>
                                            <View style={myStyles.pickerWrapper}>
                                                <Picker
                                                    selectedValue={weekFilter}

                                                    itemStyle={styles.item}
                                                    mode="dropdown"
                                                    onValueChange={(value) => handleFilter(value)}>

                                                    {rangeFilters}
                                                </Picker>
                                            </View>

                                        </Row>

                                        <Row>
                                            <Column>
                                                <SmallText between={50} top={30} style={{ color: weekFilterColour, marginBottom: 10 }}>From</SmallText>

                                                <TextInput
                                                    placeholder={weekFilter}
                                                    placeholderTextColor={weekFilterColour}
                                                    style={myStyles.input}
                                                    onChangeText={startValueInput}
                                                    value={startValue}
                                                    keyboardType='decimal-pad' />

                                            </Column>

                                            <Column>
                                                <SmallText between={50} top={30} style={{ color: weekFilterColour, marginBottom: 10 }}>To</SmallText>

                                                <TextInput
                                                    placeholder={weekFilter}
                                                    placeholderTextColor={weekFilterColour}
                                                    style={myStyles.input}
                                                    onChangeText={endValueInput}
                                                    value={endValue}
                                                    keyboardType='decimal-pad' />

                                            </Column>
                                        </Row>

                                        {/* <View style={{ margin: 30 }}></View> */}
                                    </View>

                                ) : (
                                        <View style={{ marginTop: 20 }}>
                                            <Row>
                                                <View style={myStyles.pickerWrapper}>
                                                    <Picker
                                                        selectedValue={filter}

                                                        itemStyle={styles.item}
                                                        mode="dropdown"
                                                        onValueChange={(value) => handleFilter(value)}>

                                                        {pickFilters}
                                                    </Picker>
                                                </View>

                                                <View style={myStyles.pickerWrapper}>
                                                    <Picker
                                                        selectedValue={condition}
                                                        mode="dropdown"
                                                        itemStyle={styles.item}
                                                        onValueChange={value => setCondition(value)}>

                                                        {conditionsList}
                                                    </Picker>
                                                </View>
                                            </Row>


                                            <Row>
                                                <TextInput
                                                    placeholder={weekFilter}
                                                    placeholderTextColor={weekFilterColour}
                                                    style={myStyles.input}
                                                    onChangeText={valueInput}
                                                    value={value}
                                                    keyboardType='decimal-pad' />
                                            </Row>


                                        </View>)}

                                <Row>

                                    <MyButton
                                        text='Set'
                                        colour={Colours.success}
                                        textColour={Colours.white}
                                        onPress={() => setWeekFilters()}
                                        style={{ marginHorizontal: 20 }} />

                                    <MyButton
                                        text='Clear'
                                        colour={Colours.cancel}
                                        textColour={Colours.white}
                                        onPress={() => clearFilters()}
                                        style={{ marginHorizontal: 20 }} />

                                </Row>

                            </View>
                        ) : (
                                // Main List filters
                                <View>
                                    {filter !== 'dayNumber' ? (
                                        <Row>

                                            <SmallText style={{ color: filterColour }}>Value</SmallText>

                                            <Switch
                                                value={isRange}
                                                onValueChange={handleSwitch}
                                                style={{ margin: 20 }}
                                                trackColor={{ false: Colours.backgroundLight, true: filterColour }}
                                            // ios_backgroundColor={filterColour}
                                            />

                                            <SmallText style={{ color: filterColour }}>Range</SmallText>

                                        </Row>
                                    ) : null}


                                    {isRange ? (
                                        <View style={{ marginTop: 20 }}>

                                            <Row>
                                                <View style={myStyles.pickerWrapper}>
                                                    <Picker
                                                        selectedValue={filter}

                                                        itemStyle={styles.item}
                                                        mode="dropdown"
                                                        onValueChange={(value) => handleFilter(value)}>

                                                        {rangeFilters}
                                                    </Picker>
                                                </View>

                                            </Row>

                                            <Row>
                                                <Column>
                                                    <SmallText between={50} top={30} style={{ color: filterColour, marginBottom: 10 }}>From</SmallText>

                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour}
                                                        style={myStyles.input}
                                                        onChangeText={startValueInput}
                                                        value={startValue}
                                                        keyboardType='decimal-pad' />

                                                </Column>

                                                <Column>
                                                    <SmallText between={50} top={30} style={{ color: filterColour, marginBottom: 10 }}>To</SmallText>

                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour}
                                                        style={myStyles.input}
                                                        onChangeText={endValueInput}
                                                        value={endValue}
                                                        keyboardType='decimal-pad' />

                                                </Column>
                                            </Row>

                                            {/* <View style={{ margin: 30 }}></View> */}
                                        </View>

                                    ) : (
                                            <View style={{ marginTop: 20 }}>
                                                <Row>
                                                    <View style={myStyles.pickerWrapper}>
                                                        <Picker
                                                            selectedValue={filter}

                                                            itemStyle={styles.item}
                                                            mode="dropdown"
                                                            onValueChange={(value) => handleFilter(value)}>

                                                            {pickFilters}
                                                        </Picker>
                                                    </View>

                                                    <View style={myStyles.pickerWrapper}>
                                                        <Picker
                                                            selectedValue={condition}
                                                            mode="dropdown"
                                                            itemStyle={styles.item}
                                                            onValueChange={value => setCondition(value)}>

                                                            {conditionsList}
                                                        </Picker>
                                                    </View>
                                                </Row>



                                                <Row>
                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour}
                                                        style={myStyles.input}
                                                        onChangeText={valueInput}
                                                        value={value}
                                                        keyboardType='decimal-pad' />
                                                </Row>

                                            </View>)}

                                    <Row>

                                        <MyButton
                                            text='Set'
                                            colour={Colours.success}
                                            textColour={Colours.white}
                                            onPress={() => setFilters()}
                                            style={{ marginHorizontal: 20 }} />

                                        <MyButton
                                            text='Clear'
                                            colour={Colours.cancel}
                                            textColour={Colours.white}
                                            onPress={() => clearFilters()}
                                            style={{ marginHorizontal: 20 }} />

                                    </Row>
                                </View>
                            )}


                    </ModalContainer>

                    <ModalSpace flex={space} onClose={props.onClose} />
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

const styles = StyleSheet.create({


    item: {
        color: Colours.primaryText
    }
});

export default FiltersModal;