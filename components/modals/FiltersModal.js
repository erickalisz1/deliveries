import React, { useState } from 'react';
import { View, StyleSheet, Modal, Picker, Platform, TextInput, Switch, Alert, Dimensions } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays, conditions, weekFilters } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import DismissKeyboard from '../DismissKeyboard';
import SmallText from '../SmallText';
import Row from '../Row';
import Column from '../Column';
import { DAYS, WEEKS } from '../../assets/constants/strings';
import SortingButton from '../SortingButton';

const FiltersModal = (props) => {

    //value
    const [weekDay, setWeekDay] = useState('0');
    const [condition, setCondition] = useState('>');

    const [filter, setFilter] = useState('dayNumber');
    const [filterColour, setFilterColour] = useState(Colours.days);

    const [weekFilter, setWeekFilter] = useState('deliveroo');
    const [weekFilterColour, setWeekFilterColour] = useState(Colours.deliveroo);

    const [value, setValue] = useState('');
    const [isRange, setIsRange] = useState(false);

    //range
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');

    const { list } = props;

    //if filter is weekdays
    let pickFilters = props.week ? (
        //if its weeks, filter like this
        weekFilters.map((row, index) => {

            if (Platform.OS === 'ios') {
                if (row.key !== WEEKS) {
                    return (
                        <Picker.Item label={row.key} value={row.value} key={index} color={row.colour} />
                    );
                }
            }
            else {
                if (row.key !== WEEKS) {
                    return (
                        <Picker.Item label={row.key} value={row.value} key={index} />
                    );
                }
                else return <Picker.Item label={"-Select Range-"} value={'Select Range'} key={'index'} />
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

    let space = filter === 'dayNumber' ? 16 : 10;
    space = props.week ? 8 : space;

    // !props.week ? (space = !isRange && filter === 'dayNumber' ? 5 : 4) : space = !isRange ? 6 : 4 ;

    const availableDeviceHeight = Dimensions.get('window').height;

    availableDeviceHeight < 700 ?
        (Platform.OS === 'ios' ? space += 4 : null) //small ios : android
        :
        null; //large ios : android its ok, do nothing

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <ModalSpace flex={space} onClose={props.onClose} />


                    <ModalContainer dark={false}>


                        <SortingButton text='Apply Filters' colour={props.week ? weekFilterColour : filterColour} light />

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
                                        thumbColor={Platform.OS === 'android' ? weekFilterColour : ''}
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

                                                <TextInput
                                                    placeholder={weekFilter}
                                                    placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                                    style={myStyles.input}
                                                    onChangeText={startValueInput}
                                                    value={startValue}
                                                    keyboardType='decimal-pad' />

                                                <SmallText between={50} top={10} style={{ color: weekFilterColour, marginBottom: 10 }}>From</SmallText>
                                            </Column>

                                            <Column>

                                                <TextInput
                                                    placeholder={weekFilter}
                                                    placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                                    style={myStyles.input}
                                                    onChangeText={endValueInput}
                                                    value={endValue}
                                                    keyboardType='decimal-pad' />

                                                <SmallText between={50} top={10} style={{ color: weekFilterColour, marginBottom: 10 }}>To</SmallText>

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
                                                    placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                                    style={myStyles.input}
                                                    onChangeText={valueInput}
                                                    value={value}
                                                    keyboardType='decimal-pad' />
                                            </Row>


                                        </View>)}

                                <Row>
                                    <MyButton
                                        text='Clear'
                                        colour={Colours.accent}
                                        textColour={Colours.backgroundLight}
                                        onPress={() => clearFilters()}
                                        style={{ marginHorizontal: 20 }} />
                                    <MyButton
                                        text='Set'
                                        colour={weekFilterColour}
                                        textColour={Colours.black}
                                        onPress={() => setWeekFilters()}
                                        style={{ marginHorizontal: 20 }} />
                                </Row>

                            </View>
                        ) : (
                                // Main List filters
                                <View>
                                    {filter !== 'dayNumber' ? (
                                        //if the filter is days, don't display the range
                                        <Row>

                                            <SmallText style={{ color: filterColour }}>Value</SmallText>

                                            <Switch
                                                value={isRange}
                                                onValueChange={handleSwitch}
                                                style={{ margin: 20 }}
                                                trackColor={{ false: Colours.backgroundLight, true: filterColour }}
                                                thumbColor={Platform.OS === 'android' ? filterColour : ''}
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

                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                        style={myStyles.input}
                                                        onChangeText={startValueInput}
                                                        value={startValue}
                                                        keyboardType='decimal-pad' />

                                                    <SmallText between={50} top={10} style={{ color: filterColour, marginBottom: 10 }}>From</SmallText>
                                                </Column>

                                                <Column>

                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                        style={myStyles.input}
                                                        onChangeText={endValueInput}
                                                        value={endValue}
                                                        keyboardType='decimal-pad' />

                                                    <SmallText between={50} top={10} style={{ color: filterColour, marginBottom: 10 }}>To</SmallText>
                                                </Column>
                                            </Row>
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

                                                    {filter === 'dayNumber' ? (
                                                        <View style={myStyles.pickerWrapper}>
                                                            <Picker
                                                                selectedValue={weekDay}
                                                                mode="dropdown"
                                                                itemStyle={styles.item}
                                                                onValueChange={value => setWeekDay(value)}>

                                                                {daysList}
                                                            </Picker>
                                                        </View>
                                                    ) : (
                                                            <View style={myStyles.pickerWrapper}>
                                                                <Picker
                                                                    selectedValue={condition}
                                                                    mode="dropdown"
                                                                    itemStyle={styles.item}
                                                                    onValueChange={value => setCondition(value)}>

                                                                    {conditionsList}
                                                                </Picker>
                                                            </View>)}

                                                </Row>


                                                {filter === 'dayNumber' ? (
                                                    //if the filter is days
                                                    null
                                                ) : (
                                                        //if the filter is a number
                                                        <Row>
                                                            <TextInput
                                                                placeholder={filter}
                                                                placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                                style={myStyles.input}
                                                                onChangeText={valueInput}
                                                                value={value}
                                                                keyboardType='decimal-pad' />
                                                        </Row>)}


                                            </View>)}

                                    <Row>
                                        <MyButton
                                            text='Clear'
                                            colour={Colours.accent}
                                            textColour={Colours.backgroundLight}
                                            onPress={() => clearFilters()}
                                            style={{ marginHorizontal: 20 }} />

                                        <MyButton
                                            text='Set'
                                            colour={filterColour}
                                            textColour={Colours.black}
                                            onPress={() => setFilters()}
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