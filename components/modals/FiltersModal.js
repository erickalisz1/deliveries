import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Picker, Platform, TextInput } from 'react-native';
import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import ModalContainer from './ModalContainer';
import { filters, weekDays } from '../../assets/helper/helper';
import { myStyles } from '../../assets/helper/Styles';

const FiltersModal = (props) => {

    const [weekDay, setWeekDay] = useState('0');
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

    const setFilters = () => {
        props.result(list, filter, value, 600, 'larger');
    };

    const valueInput = (enteredValue) => {
        setValue(enteredValue);
    };

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>
            <ModalSpace flex={2} onClose={props.onClose} />
            <ModalContainer dark={false}>
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
                        <TextInput
                            placeholder={filter}
                            placeholderTextColor={Colours.placeholder}
                            style={myStyles.input}
                            onChangeText={valueInput}
                            value={value}
                            keyboardType='decimal-pad' />
                    )}

                <TouchableOpacity onPress={() => setFilters()}>
                    <MyButton text='Set Filters' colour={Colours.primaryText} textColour={Colours.background} />
                </TouchableOpacity>
            </ModalContainer>
            <ModalSpace flex={2} onClose={props.onClose} />
        </Modal>
    );
};

const styles = StyleSheet.create({
    picker: {
        height: Platform.OS === 'ios' ? 150 : 50,
        width: '60%',
        marginVertical: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: Colours.primaryText,
        paddingBottom: Platform.OS === 'ios' ? 200 : 20
    },
    item: {
        color:Colours.primaryText
    }
});

export default FiltersModal;