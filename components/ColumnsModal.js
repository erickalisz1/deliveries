import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import Colours from '../constants/colours';

const ColumnsModal = (props) => {

    let options = [//needed to have the lower case name as well because of the property name (might fix later by changing the class attributes to upper case)
        {display:'Days', value:'dayNumber'}, 
        {display:'Deliveroo', value:'deliveroo'}, 
        {display:'Uber', value:'uber'}, 
        {display:'Total', value:'total'}, 
        {display:'Per', value:'per'}
    ];

    const sortColumn = (selectedColumn) => {        
        props.selectColumn(selectedColumn);
    };

    let listOfOptions = options.map((row, index) => {
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

            {/* splitting the screen in half for nicer effect */}
            <View style={{flex:1}} ></View>
            
            <View style={styles.screen}>
                <Text style={styles.modalTitle}>Select column to sort:</Text>
                {listOfOptions}

                <TouchableOpacity style={styles.cancel} onPress={props.onClose}>
                    <View>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 25 : 10,
        backgroundColor: Colours.backgroundLight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    item: {
        marginVertical: 3,
        width: '45%',
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: Colours.white,
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
        marginBottom:5
    },
    cancel: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colours.cancel,
    },
    cancelText:{
        fontSize: 24,
        color: Colours.primaryText,
        textAlign: 'center',
    }
});

export default ColumnsModal;