import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import Colours from '../../assets/constants/darkTheme';
import ModalSpace from '../modals/ModalSpace';
import MyButton from '../MyButton';
import { WEEKS, DEL, UB, TOTAL, PER, DAYS } from '../../assets/constants/strings';

const ColumnsModal = (props) => {

    let options = props.week === true ? [//needed to have the lower case name as well because of the property name (might fix later by changing the class attributes to upper case)
        {display:WEEKS, value:'week'}, 
        {display:DEL, value:'deliveroo'}, 
        {display:UB, value:'uber'}, 
        {display:TOTAL, value:'total'}, 
        {display:PER, value:'per'}
    ] : [
        {display:DAYS, value:'dayNumber'}, 
        {display:DEL, value:'deliveroo'}, 
        {display:UB, value:'uber'}, 
        {display:TOTAL, value:'total'}, 
        {display:PER, value:'per'}
    ];

    const sortColumn = (selectedColumn) => {        
        props.selectColumn(selectedColumn);
    };

    let listOfOptions = options.map((row, index) => 
    {//function to better display items
        return (
            <TouchableOpacity key={index} style={styles.item} onPress={() => sortColumn(row.value)}>
                <View>
                    <Text style={styles.value}>{row.display}</Text>
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

                <TouchableOpacity onPress={props.onClose} style={{marginBottom:20}}>
                    <MyButton text='Cancel' colour={Colours.cancel} textColour={Colours.white} />
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

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
    item: {
        marginVertical: 5,
        width: '45%',
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colours.accent,
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
        marginBottom:15
    },
});

export default ColumnsModal;