import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';

import { filters, weekFilters } from '../../assets/helper/helper';
import Colours from '../../assets/constants/Colours';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';

const ColumnsModal = (props) => {

    const styles = StyleSheet.create({
        container: {
            flex: 10,
            padding: Platform.OS === 'ios' ? 25 : 10,
            backgroundColor: Colours.backgroundLight,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end'
        },
        itemWrapper: {

        },
        value: {
            fontSize: 20,
            color: Colours.primaryText,
            textAlign: 'center'
        },
        modalTitle: {
            fontSize: 24,
            color: Colours.primaryText,
            textAlign: 'center',
            marginBottom: 15
        },
    });


    let options = props.week ? weekFilters : filters;

    const sortColumn = (selectedColumn, colour) => {
        props.selectColumn(selectedColumn, colour);
    };

    let listOfOptions = options.map((row, index) => {//function to better display items
        if (row.value !== 'hours')
            return (
                <TouchableOpacity key={index} style={{
                    marginVertical: 5,
                    width: '45%',
                    padding: 10,
                    borderWidth: 2,
                    borderRadius: 15,
                    borderColor: row.colour,
                }} onPress={() => sortColumn(row.value, row.colour)}>
                    <View>
                        <Text style={styles.value}>{row.key}</Text>
                    </View>
                </TouchableOpacity>
            );
    })

    return (
        <Modal transparent={true} visible={props.visible} animationType='slide'>

            <ModalSpace onClose={props.onClose} flex={Platform.OS === 'ios' ? 8.5 : 6} />

            <View style={styles.container}>
                <Text style={styles.modalTitle}>Select value to sort:</Text>

                {listOfOptions}

                <MyButton
                    text='Cancel'
                    colour={Colours.cancel}
                    textColour={Colours.white}
                    onPress={props.onClose}
                    style={{ marginBottom: 20 }} />

            </View>
        </Modal>
    );
};

export default ColumnsModal;