import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, Platform } from 'react-native';

import Colours from '../../assets/constants/darkTheme';
import LargeText from '../LargeText';
import ModalContainer from './ModalContainer';
import ModalSpace from './ModalSpace';
import MyButton from '../MyButton';
import { setWeekString, setDateString, setDailyMessage, setWeeklyMessage } from '../../assets/helper/helper';

const DetailModal = (props) => {


    if (props.week) {

        const { week } = props

        console.log(week);

        let weekString = setWeekString(week.start, week.end);

        let details = setWeeklyMessage(week);

        //ES-6 regular expression to count how many lines I have in my string
        let count = (details.match(/\n/g) || []).length;

        //the more lines I have, the less space I will need outside my ModalContainer
        let space = 11 - count;

        space = Platform.OS = 'ios' ? space : space += 3;

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>

                <ModalSpace onClose={props.onClose} flex={space} />

                <ModalContainer>

                    <View style={styles.row}>
                        <LargeText modal={true}>{weekString}</LargeText>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.description}>{details}</Text>
                    </View>


                    <TouchableOpacity onPress={props.onClose} style={styles.row}>
                        <MyButton text='Got it' colour={Colours.success} textColour={Colours.primaryText} />
                    </TouchableOpacity>

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={space} />
            </Modal>


        );
    }
    else if (props.day) {

        const { day, list } = props;

        let date = setDateString(day.actualDay);

        let details = setDailyMessage(day, list);

        //ES-6 regular expression to count how many lines I have in my string
        let count = (details.match(/\n/g) || []).length;

        //the more lines I have, the less space I will need outside my ModalContainer
        let space = 13 - count;

        //fixing space
        space = space === 2 ? space = 4 : space ;

        return (

            <Modal transparent={true} visible={props.visible} animationType='slide'>

                <ModalSpace onClose={props.onClose} flex={space} />

                <ModalContainer dark={false} smaller={true} >

                    <View style={styles.row}>
                        <LargeText modal={true}>{date}</LargeText>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.description}>{details}</Text>
                    </View>


                    <TouchableOpacity onPress={props.onClose} style={styles.row}>
                        <MyButton text='Got it' colour={Colours.success} textColour={Colours.primaryText} />
                    </TouchableOpacity>

                </ModalContainer>

                <ModalSpace onClose={props.onClose} flex={space} />
            </Modal>


        );
    }

    else return null;
};

const styles = StyleSheet.create({
    row: {
        paddingHorizontal: 25,
        margin: 0
    },
    description: {
        color: Colours.primaryText,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default DetailModal;