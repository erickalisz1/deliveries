import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Picker, Platform, TextInput, Switch, Text } from 'react-native';
import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays, conditions } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';
import SmallText from '../SmallText';
import Row from '../Row';
import Column from '../Column';

const FiltersModal = (props) => {

    //value
    const [weekDay, setWeekDay] = useState('0');
    const [condition, setCondition] = useState('>');
    const [filter, setFilter] = useState('dayNumber');
    const [value, setValue] = useState('');
    const [isRange, setIsRange] = useState(false);

    //range
    const [weekDayStart, setWeekDayStart] = useState('0');
    const [weekDayEnd, setWeekDayEnd] = useState('0');
    const [startValue, setStartValue] = useState('');
    const [endValue, setEndValue] = useState('');
    const [daysEndList, setDaysEndList] = useState([]);

    const { list } = props;


    //if filter is weekdays
    let pickFilters = filters.map((row, index) => {
        return (
            <Picker.Item label={row.key} value={row.value} key={index} />
        );
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

        if(!isRange && filter === 'dayNumber')
        {//if its a weekDay
            props.result(list, filter, isRange, weekDay, '', '');
        }
        else if(isRange && filter === 'dayNumber')
        {//if its a range of days
            props.result(list, filter, isRange, weekDayStart, weekDayEnd, '');
        }
        else if(!isRange && filter !== 'dayNumber')
        {//if its a single value
            props.result(list, filter, isRange, value, -1, condition);
        }
        else if(isRange && filter !== 'dayNumber')
        {//if its a range between values
            props.result(list, filter, isRange, startValue, endValue, '');
        }

        
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
    };
    const endValueInput = (enteredValue) => {
        setEndValue(enteredValue);
    };

    const handleSwitch = () => {
        isRange ? setIsRange(false) : setIsRange(true)
    };

    const updateWeekRange = value => {
        setWeekDayStart(value);
        setDaysEndList(daysList.filter(item => item.key > value));
    };

    let space;

    space = filter === 'dayNumber' ? 7 : 6;

    space = isRange ? 3 : space;

    space = isRange && filter === 'dayNumber' ? 2 : space;

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <ModalSpace flex={space} onClose={props.onClose} />


                    <ModalContainer dark={false}>

                        <LargeText modal={true}>Filters</LargeText>

                        <Row>

                            <SmallText between={10}>Value</SmallText>
                            <Switch value={isRange} onValueChange={handleSwitch} />
                            <SmallText between={10}>Range</SmallText>

                        </Row>

                        {isRange ? (
                            <View style={{ marginTop: 35 }}>

                                <Row>
                                    <View style={myStyles.pickerWrapper}>
                                        <Picker
                                            selectedValue={filter}

                                            itemStyle={styles.item}
                                            mode="dropdown"
                                            onValueChange={(value) => setFilter(value)}>

                                            {pickFilters}
                                        </Picker>
                                    </View>

                                </Row>

                                <Row>
                                    <Column>
                                        <SmallText between={50} top={30}>From</SmallText>

                                        {filter === 'dayNumber' ? (
                                            <View style={myStyles.columnPickerWrapper}>
                                                <Picker
                                                    selectedValue={weekDayStart}
                                                    mode="dropdown"
                                                    itemStyle={styles.item}
                                                    onValueChange={value => updateWeekRange(value)}>

                                                    {daysList}
                                                </Picker>
                                            </View>
                                        ) : (
                                                <TextInput
                                                    placeholder={filter}
                                                    placeholderTextColor={Colours.placeholder}
                                                    style={myStyles.input}
                                                    onChangeText={startValueInput}
                                                    value={startValue}
                                                    keyboardType='decimal-pad' />)}

                                    </Column>

                                    <Column>
                                        <SmallText between={50} top={30}>To</SmallText>

                                        {filter === 'dayNumber' ? (
                                            <View style={myStyles.columnPickerWrapper}>
                                                <Picker
                                                    selectedValue={weekDayEnd}
                                                    mode="dropdown"
                                                    itemStyle={styles.item}
                                                    onValueChange={value => setWeekDayEnd(value)}>

                                                    {daysEndList}
                                                </Picker>
                                            </View>
                                        ) : (
                                                <TextInput
                                                    placeholder={filter}
                                                    placeholderTextColor={Colours.placeholder}
                                                    style={myStyles.input}
                                                    onChangeText={endValueInput}
                                                    value={endValue}
                                                    keyboardType='decimal-pad' />
                                            )}

                                    </Column>
                                </Row>

                                {/* <View style={{ margin: 30 }}></View> */}
                            </View>

                        ) : (
                                <View style={{marginTop:20}}>
                                    <Row>
                                        <View style={myStyles.pickerWrapper}>
                                            <Picker
                                                selectedValue={filter}

                                                itemStyle={styles.item}
                                                mode="dropdown"
                                                onValueChange={(value) => setFilter(value)}>

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


                                    {filter === 'dayNumber' ? null : (
                                        <Row>
                                            <TextInput
                                                placeholder={filter}
                                                placeholderTextColor={Colours.placeholder}
                                                style={myStyles.input}
                                                onChangeText={valueInput}
                                                value={value}
                                                keyboardType='decimal-pad' />
                                        </Row>
                                    )}

                                </View>)}

                        <Row>

                            <TouchableOpacity onPress={() => setFilters()} style={{ paddingHorizontal: 10 }}>
                                <MyButton text='Set' colour={Colours.primaryText} textColour={Colours.background} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => clearFilters()} style={{ paddingHorizontal: 10 }}>
                                <MyButton text='Clear' colour={Colours.primaryText} textColour={Colours.background} />
                            </TouchableOpacity>

                        </Row>

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