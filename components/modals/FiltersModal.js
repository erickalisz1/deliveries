import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Picker, Platform, TextInput } from 'react-native';
import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays, conditions } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';
import DismissKeyboard from '../DismissKeyboard';
import LargeText from '../LargeText';

const FiltersModal = (props) => {

    const [weekDay, setWeekDay] = useState('0');
    const [condition, setCondition] = useState('>');
    const [filter, setFilter] = useState('dayNumber');
    const [value, setValue] = useState('');
    const [isRange, setIsRange] = useState(false);


    const { list } = props;


    //if filter is weekdays
    let pickFilters = filters.map((row, index) => {
        return (
            <Picker.Item label={row.key} value={row.value} key={index} />
        );
    });

    //if filter is weekdays
    let pickerList = weekDays.map((row, index) => {//{array}.map array is going to be set by state and changed according to what the user selects
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

        filter === 'dayNumber' ? props.result(list, filter, weekDay, 600, '') : props.result(list, filter, value, 600, condition)
    };

    const clearFilters = () => {
        props.clear();
        props.onClose();
    };

    const valueInput = (enteredValue) => {
        setValue(enteredValue);
    };

    let space;
    space = filter === 'dayNumber' ? 8 : 6;

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    <ModalSpace flex={space} onClose={props.onClose} />


                    <ModalContainer dark={false}>

                        <LargeText modal={true}>Filters</LargeText>

                        <View style={styles.horizontalContainer}>
                            <View style={styles.picker}>
                                <Picker
                                    selectedValue={filter}

                                    itemStyle={styles.item}
                                    mode="dropdown"
                                    onValueChange={(value) => setFilter(value)}>

                                    {pickFilters}
                                </Picker>
                            </View>
                            {filter === 'dayNumber' ? (
                                <View style={styles.picker}>
                                    <Picker
                                        selectedValue={weekDay}
                                        mode="dropdown"
                                        itemStyle={styles.item}
                                        onValueChange={value => setWeekDay(value)}>

                                        {pickerList}
                                    </Picker>
                                </View>
                            ) : (
                                <View style={styles.picker}>
                                    <Picker
                                        selectedValue={condition}
                                        mode="dropdown"
                                        itemStyle={styles.item}
                                        onValueChange={value => setCondition(value)}>

                                        {conditionsList}
                                    </Picker>
                                </View>)}
                        </View>


                        {filter === 'dayNumber' ? null : (
                            <TextInput
                                placeholder={filter}
                                placeholderTextColor={Colours.primaryText}
                                style={myStyles.input}
                                onChangeText={valueInput}
                                value={value}
                                keyboardType='decimal-pad' />
                        )}
                        <View style={styles.horizontalContainer}>
                            <TouchableOpacity onPress={() => setFilters()} style={{ paddingHorizontal: 10 }}>
                                <MyButton text='Set' colour={Colours.primaryText} textColour={Colours.background} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => clearFilters()} style={{ paddingHorizontal: 10 }}>
                                <MyButton text='Clear' colour={Colours.primaryText} textColour={Colours.background} />
                            </TouchableOpacity>
                        </View>
                    </ModalContainer>

                    <ModalSpace flex={space} onClose={props.onClose} />
                </View>
            </DismissKeyboard>
        </Modal>
    );
};

const styles = StyleSheet.create({
    picker: {
        height: 50,
        width: '40%',
        borderRadius: 5,
        borderWidth: Platform.OS === 'ios' ? 0 : 1,
        borderColor: Colours.primaryText,
        backgroundColor: Platform.OS === 'ios' ? Colours.transparent : Colours.primaryText,
        marginBottom: Platform.OS === 'ios' ? 150 : 20,
        marginTop: Platform.OS === 'ios' ? -50 : 0,
        marginHorizontal: 10
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '100%',
    },
    item: {
        color: Colours.primaryText
    }
});

export default FiltersModal;