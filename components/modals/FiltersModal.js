import React, { useState } from 'react';
import { View, Modal, Picker, Platform, TextInput, Alert } from 'react-native';

import Colours from '../../assets/constants/Colours';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays, conditions, weekFilters } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import DismissKeyboard from '../DismissKeyboard';
import Row from '../Row';
import { WEEKS, BETWEEN } from '../../assets/constants/strings';
import SortingButton from '../SortingButton';
import PickerWrapper from '../PickerWrapper';

const FiltersModal = (props) => {

    //value
    const [weekDay, setWeekDay] = useState('0');
    const [condition, setCondition] = useState('>');

    const [filter, setFilter] = useState('dayNumber');
    const [filterColour, setFilterColour] = useState(Colours.days);

    const [weekFilter, setWeekFilter] = useState('deliveroo');
    const [weekFilterColour, setWeekFilterColour] = useState(Colours.deliveroo);

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

        let start = Number(startValue);
        let end = Number(endValue);

        if (props.week) {

            if (!isRange) {//if its a single value
                props.result(list, weekFilter, isRange, startValue, -1, condition);
            }
            else if (isRange && end > start) {//if its a range between values, the end value must be larger than the start

                props.result(list, weekFilter, isRange, startValue, endValue, ' between ');
            }
            else Alert.alert('Please chek your values');
        }

        else {
            if (!isRange && filter === 'dayNumber') {//if its a weekDay
                props.result(list, filter, isRange, weekDay, '', '');
            }
            else if (!isRange && filter !== 'dayNumber') {//if its a single value
                props.result(list, filter, isRange, startValue, -1, condition);
            }
            else if (isRange && end > start) {//if its a range between values, the end value must be larger than the start
                props.result(list, filter, isRange, startValue, endValue, ' between ');
            }
            else Alert.alert('Please chek your values');
        }


    };

    const clearFilters = () => {
        props.clear();
        props.onClose();
    };

    // const valueInput = (enteredValue) => {
    //     setValue(enteredValue);
    // };

    const startValueInput = (enteredValue) => {
        setStartValue(enteredValue);
    };
    const endValueInput = (enteredValue) => {
        setEndValue(enteredValue);
    };

    // const handleSwitch = () => {
    //     isRange ? setIsRange(false) : setIsRange(true)
    // };

    const handleFilter = value => {

        filters.forEach(item => {

            if (value === 'dayNumber') setIsRange(false);

            if (item.value === value) {
                setFilter(value);
                setFilterColour(item.colour);

                setWeekFilter(value);
                setWeekFilterColour(item.colour);
            }
            else null
        });
    };

    const handleCondition = value => {

        setCondition(value);

        if (value === BETWEEN) {
            setIsRange(true);
        }
        else setIsRange(false);
    };

    let space = 20;
    let minHeight = 330;

    minHeight = (filter === 'dayNumber') ? 250 : minHeight;
    minHeight = props.week ? 350 : minHeight;

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <ModalSpace flex={space} onClose={props.onClose} />

                    <ModalContainer dark={false} minHeight={minHeight} style={{ borderColor: props.week ? weekFilterColour : filterColour }}>


                        <SortingButton text='Apply Filters' colour={props.week ? weekFilterColour : filterColour} light onPress={() => setFilters()} />

                        {props.week ? (
                            //Weeks List filters
                            <View>
                                <Row style={{ marginTop: 20 }}>
                                    {isRange ? (
                                        <Row>
                                            <TextInput
                                                placeholder={'From'}
                                                placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                                style={myStyles.input}
                                                onChangeText={startValueInput}
                                                value={startValue}
                                                keyboardType='decimal-pad' />

                                            <TextInput
                                                placeholder={'To'}
                                                placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                                style={myStyles.input}
                                                onChangeText={endValueInput}
                                                value={endValue}
                                                keyboardType='decimal-pad' />

                                        </Row>

                                    ) :

                                        <TextInput
                                            placeholder={weekFilter}
                                            placeholderTextColor={weekFilterColour + '80'}//make the colour a bit lighter
                                            style={myStyles.input}
                                            onChangeText={startValueInput}
                                            value={startValue}
                                            keyboardType='decimal-pad'
                                        />
                                    }

                                </Row>

                                <Row style={{ marginTop: 15 }}>
                                    <PickerWrapper>
                                        <Picker
                                            selectedValue={filter}

                                            itemStyle={myStyles.pickerItem}
                                            mode="dropdown"
                                            onValueChange={(value) => handleFilter(value)}>

                                            {pickFilters}
                                        </Picker>
                                    </PickerWrapper>

                                    <PickerWrapper>
                                        <Picker
                                            selectedValue={condition}
                                            mode="dropdown"
                                            itemStyle={myStyles.pickerItem}
                                            onValueChange={value => handleCondition(value)}>

                                            {conditionsList}
                                        </Picker>
                                    </PickerWrapper>
                                </Row>

                            </View>
                        ) : (
                                // Main List filters
                                <View>
                                    {filter === 'dayNumber' ? (
                                        //if the filter is days                           
                                        null
                                    ) : (
                                            //if the filter is a number
                                            <Row style={{ marginTop: 20 }}>
                                                {isRange ? (
                                                    <Row>
                                                        <TextInput
                                                            placeholder={'From'}
                                                            placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                            style={myStyles.input}
                                                            onChangeText={startValueInput}
                                                            value={startValue}
                                                            keyboardType='decimal-pad' />

                                                        <TextInput
                                                            placeholder={'To'}
                                                            placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                            style={myStyles.input}
                                                            onChangeText={endValueInput}
                                                            value={endValue}
                                                            keyboardType='decimal-pad' />

                                                    </Row>

                                                ) :

                                                    <TextInput
                                                        placeholder={filter}
                                                        placeholderTextColor={filterColour + '80'}//make the colour a bit lighter
                                                        style={myStyles.input}
                                                        onChangeText={startValueInput}
                                                        value={startValue}
                                                        keyboardType='decimal-pad'
                                                    />
                                                }

                                            </Row>
                                        )}

                                    <Row style={{ marginTop: 15 }}>
                                        <PickerWrapper>
                                            <Picker
                                                selectedValue={filter}

                                                itemStyle={myStyles.pickerItem}
                                                mode="dropdown"
                                                onValueChange={(value) => handleFilter(value)}>

                                                {pickFilters}
                                            </Picker>
                                        </PickerWrapper>

                                        {filter === 'dayNumber' ? (
                                            <PickerWrapper>
                                                <Picker
                                                    selectedValue={weekDay}
                                                    mode="dropdown"
                                                    itemStyle={myStyles.pickerItem}
                                                    onValueChange={value => setWeekDay(value)}>

                                                    {daysList}
                                                </Picker>
                                            </PickerWrapper>
                                        ) : (
                                                <PickerWrapper>
                                                    <Picker
                                                        selectedValue={condition}
                                                        mode="dropdown"
                                                        itemStyle={myStyles.pickerItem}
                                                        onValueChange={value => handleCondition(value)}>

                                                        {conditionsList}
                                                    </Picker>
                                                </PickerWrapper>)}

                                    </Row>


                                </View>
                            )}

                        <Row style={{ marginTop: 20 }}>
                            <MyButton
                                text='Clear'
                                colour={Colours.accent}
                                textColour={Colours.backgroundLight}
                                onPress={() => clearFilters()}
                                style={{ marginHorizontal: 20 }} />

                            <MyButton
                                text='Set'
                                colour={props.week ? weekFilterColour : filterColour}
                                textColour={Colours.black}
                                onPress={() => setFilters()}
                                style={{ marginHorizontal: 20 }} />
                        </Row>

                    </ModalContainer>

                    <ModalSpace flex={space} onClose={props.onClose} />
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

export default FiltersModal;